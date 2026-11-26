# Шахматные задачи — Telegram Mini App

Простое приложение с шахматными задачами (мат в 1, 2 и 3 хода), которое открывается внутри Telegram.

- Сайт: https://xom1803.github.io/chess_puzzles/
- Код: React + Vite, доска — `react-chessboard`, правила — `chess.js`
- Публикация: автоматически через GitHub Actions при каждом изменении в ветке `main`

## Где что лежит

- `src/puzzles.js` — список задач (позиция FEN + правильные ходы)
- `src/App.jsx` — экран задачи
- `src/App.css` — оформление
- `src/telegram.js` — тема, вибрация и сохранение прогресса в Telegram
- `scripts/` — проверка задач: `node scripts/try.mjs '[["<FEN>", 2]]'`

## Запуск на компьютере

```
npm install
npm run dev
```

## Задача из поста в канале

1. Добавить задачу в `src/puzzles.js` со своим `id` (латиницей), например `immortal`.
2. Ссылка для поста: `https://t.me/chesskage_bot/<short name приложения>?startapp=immortal`

## Публикация поста с кнопкой в канал

1. Создать папку `posts/<id задачи>/` с файлами `text.txt` (текст поста, можно `<b>жирный</b>`) и `photo.jpg`.
2. Actions → «Post to Telegram channel» → Run workflow → ввести id задачи.

Один раз нужно добавить секреты `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHANNEL` (Settings → Secrets and variables → Actions) и сделать бота администратором канала.
