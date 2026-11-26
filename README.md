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
