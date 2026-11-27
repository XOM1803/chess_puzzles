#!/usr/bin/env bash
# Publish posts/<name>/ to the Telegram channel with an inline "solve" button.
# Usage: scripts/post.sh <name> [button text]
# Needs env: TOKEN, CHANNEL, BOT_USERNAME, APP_NAME
set -euo pipefail

POST="$1"
BUTTON="${2:-▶️ Решить задачу}"

if [ -z "${TOKEN:-}" ] || [ -z "${CHANNEL:-}" ]; then
  echo "::error::Добавь секреты TELEGRAM_BOT_TOKEN и TELEGRAM_CHANNEL"
  exit 1
fi
if ! [[ "$POST" =~ ^[A-Za-z0-9_-]+$ ]]; then
  echo "::error::Название папки: только латиница, цифры, - и _"
  exit 1
fi

DIR="posts/$POST"
if [ ! -f "$DIR/text.txt" ]; then
  echo "::error::Не найден файл $DIR/text.txt"
  exit 1
fi

URL="https://t.me/$BOT_USERNAME/$APP_NAME?startapp=$POST"
KEYBOARD=$(jq -nc --arg t "$BUTTON" --arg u "$URL" '{inline_keyboard: [[{text: $t, url: $u}]]}')
PHOTO=$(ls "$DIR"/photo.* 2>/dev/null | head -1 || true)
API="https://api.telegram.org/bot$TOKEN"

if [ -n "$PHOTO" ]; then
  LEN=$(wc -m < "$DIR/text.txt")
  if [ "$LEN" -gt 1024 ]; then
    echo "::error::Текст с картинкой должен быть не длиннее 1024 символов (сейчас $LEN)"
    exit 1
  fi
  RESPONSE=$(curl -sS "$API/sendPhoto" \
    --form-string "chat_id=$CHANNEL" \
    -F "photo=@$PHOTO" \
    -F "caption=<$DIR/text.txt" \
    --form-string "parse_mode=HTML" \
    --form-string "reply_markup=$KEYBOARD")
else
  RESPONSE=$(curl -sS "$API/sendMessage" \
    --form-string "chat_id=$CHANNEL" \
    -F "text=<$DIR/text.txt" \
    --form-string "parse_mode=HTML" \
    --form-string "reply_markup=$KEYBOARD")
fi

if [ "$(echo "$RESPONSE" | jq -r '.ok')" != "true" ]; then
  echo "::error::Telegram ответил ошибкой: $(echo "$RESPONSE" | jq -r '.description')"
  exit 1
fi
echo "Пост $POST опубликован, кнопка ведёт на $URL"
