#!/usr/bin/env bash
# Publish instagram/<name>/ (photo.jpg + caption.txt) to Instagram.
# Usage: scripts/instagram.sh <name>
# Needs env: IG_TOKEN, REPO, SHA
set -euo pipefail

POST="$1"
if [ -z "${IG_TOKEN:-}" ]; then
  echo "::error::Добавь секрет INSTAGRAM_TOKEN"
  exit 1
fi
if ! [[ "$POST" =~ ^[A-Za-z0-9_-]+$ ]]; then
  echo "::error::Название папки: только латиница, цифры, - и _"
  exit 1
fi

DIR="instagram/$POST"
[ -f "$DIR/photo.jpg" ] || { echo "::error::Нужна картинка $DIR/photo.jpg (именно JPG)"; exit 1; }
[ -f "$DIR/caption.txt" ] || { echo "::error::Нужен текст $DIR/caption.txt"; exit 1; }
LEN=$(wc -m < "$DIR/caption.txt")
[ "$LEN" -le 2200 ] || { echo "::error::Подпись длиннее 2200 символов ($LEN)"; exit 1; }

API="https://graph.instagram.com"
# Instagram downloads the picture itself, from the public repository
IMAGE_URL="https://raw.githubusercontent.com/$REPO/$SHA/$DIR/photo.jpg"

check() {
  if [ "$(echo "$1" | jq -r 'has("error")')" = "true" ]; then
    echo "::error::Instagram ответил ошибкой: $(echo "$1" | jq -r '.error.message')"
    exit 1
  fi
}

# 1. Create a media container
RESPONSE=$(curl -sS -X POST "$API/me/media" \
  --data-urlencode "image_url=$IMAGE_URL" \
  --data-urlencode "caption@$DIR/caption.txt" \
  --data-urlencode "access_token=$IG_TOKEN")
check "$RESPONSE"
CONTAINER=$(echo "$RESPONSE" | jq -r '.id')

# 2. Wait until Instagram has processed the picture
for i in $(seq 1 20); do
  STATUS=$(curl -sS -G "$API/$CONTAINER" --data-urlencode "fields=status_code" --data-urlencode "access_token=$IG_TOKEN")
  check "$STATUS"
  CODE=$(echo "$STATUS" | jq -r '.status_code')
  [ "$CODE" = "FINISHED" ] && break
  [ "$CODE" = "ERROR" ] && { echo "::error::Instagram не смог обработать картинку"; exit 1; }
  sleep 3
done

# 3. Publish
RESPONSE=$(curl -sS -X POST "$API/me/media_publish" \
  --data-urlencode "creation_id=$CONTAINER" \
  --data-urlencode "access_token=$IG_TOKEN")
check "$RESPONSE"
echo "Пост $POST опубликован в Instagram (id $(echo "$RESPONSE" | jq -r '.id'))"
