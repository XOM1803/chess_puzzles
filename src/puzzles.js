// Puzzle list. Every puzzle was checked with scripts/solve.mjs:
// - the position has a forced mate in exactly `mateIn` moves (no faster mate);
// - every non-final move of the side to move is the only winning move.
// `moves` are in UCI format (from + to square). Even indexes = player, odd = opponent reply.

export const LEVELS = [
  { id: 'easy', title: 'Лёгкие', mateIn: 1 },
  { id: 'medium', title: 'Средние', mateIn: 2 },
  { id: 'hard', title: 'Сложные', mateIn: 3 },
]

export const PUZZLES = [
  // Easy: mate in 1
  { id: 'e1', level: 'easy', fen: '6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', moves: ['a1a8'] },
  { id: 'e2', level: 'easy', fen: '7k/R7/8/8/8/8/8/1R4K1 w - - 0 1', moves: ['b1b8'] },
  { id: 'e3', level: 'easy', fen: '6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1', moves: ['h6f7'] },
  { id: 'e4', level: 'easy', fen: '3r2k1/8/8/8/8/8/5PPP/6K1 b - - 0 1', moves: ['d8d1'] },
  { id: 'e5', level: 'easy', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1', moves: ['f3f7'] },
  { id: 'e6', level: 'easy', fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2', moves: ['d8h4'] },
  { id: 'e7', level: 'easy', fen: '6k1/5ppp/8/8/8/8/1Q3PPP/6K1 w - - 0 1', moves: ['b2b8'] },
  { id: 'e8', level: 'easy', fen: '7k/7p/5N2/8/8/8/8/6RK w - - 0 1', moves: ['g1g8'] },
  { id: 'e9', level: 'easy', fen: 'k7/8/1K6/8/8/8/8/7Q w - - 0 1', moves: ['h1b7'] },
  { id: 'e10', level: 'easy', fen: '6k1/5ppp/4p3/8/8/2B5/5PPP/3Q2K1 w - - 0 1', moves: ['d1d8'] },
  { id: 'e11', level: 'easy', fen: '5r1k/6pp/8/8/8/8/1Q4PP/5RK1 w - - 0 1', moves: ['f1f8'] },
  { id: 'e12', level: 'easy', fen: '1k6/ppp5/8/8/8/8/8/K2Q4 w - - 0 1', moves: ['d1d8'] },

  // Medium: mate in 2
  { id: 'm1', level: 'medium', fen: 'r6k/6pp/7N/8/2Q5/8/8/6K1 w - - 0 1', moves: ['c4g8', 'a8g8', 'h6f7'] },
  { id: 'm2', level: 'medium', fen: '5r1k/4Nppp/8/7Q/8/5R2/6PP/6K1 w - - 0 1', moves: ['h5h7', 'h8h7', 'f3h3'] },
  { id: 'm3', level: 'medium', fen: '6k1/3r1ppp/8/8/8/8/5PPP/1Q1R2K1 w - - 0 1', moves: ['b1b8', 'd7d8', 'b8d8'] },
  { id: 'm4', level: 'medium', fen: 'k7/8/2K5/8/8/8/8/1R6 w - - 0 1', moves: ['c6c7', 'a8a7', 'b1a1'] },
  { id: 'm5', level: 'medium', fen: '7k/8/5K2/8/8/8/8/6R1 w - - 0 1', moves: ['f6f7', 'h8h7', 'g1h1'] },
  { id: 'm6', level: 'medium', fen: '3k4/8/2K5/8/8/8/8/7R w - - 0 1', moves: ['h1e1', 'd8c8', 'e1e8'] },
  { id: 'm7', level: 'medium', fen: '4k3/8/3K4/8/8/8/8/7R w - - 0 1', moves: ['h1f1', 'e8d8', 'f1f8'] },
  { id: 'm8', level: 'medium', fen: '7k/8/8/6K1/8/8/8/1Q6 w - - 0 1', moves: ['g5g6', 'h8g8', 'b1b8'] },
  { id: 'm9', level: 'medium', fen: '5k2/8/4K3/8/8/8/8/7R w - - 0 1', moves: ['h1g1', 'f8e8', 'g1g8'] },
  { id: 'm10', level: 'medium', fen: '2k5/8/1K6/8/8/8/8/7R w - - 0 1', moves: ['h1d1', 'c8b8', 'd1d8'] },
  // Channel posts (open directly with ?startapp=<id>)
  {
    id: 'immortal',
    level: 'medium',
    title: 'Бессмертная партия, Андерсен, 1851',
    fen: 'r1bk2nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1 w - - 1 22',
    moves: ['f3f6', 'g8f6', 'd6e7'],
  },
  {
    id: 'opera',
    level: 'medium',
    title: 'Оперная партия, Морфи, 1858',
    fen: '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',
    moves: ['b3b8', 'd7b8', 'd1d8'],
  },

  // Hard: mate in 3
  { id: 'h1', level: 'hard', fen: 'r5k1/5Npp/8/8/2Q5/8/8/6K1 w - - 0 1', moves: ['f7h6', 'g8h8', 'c4g8', 'a8g8', 'h6f7'] },
]

// Opening traps. `goal` is shown above the board, `explanation` after solving.
// mate: false -> the final move must match exactly (e.g. winning the queen).
export const TRAPS = [
  {
    id: 'legal',
    title: 'Мат Легаля',
    goal: 'Белые: пожертвуй ферзя и поставь мат',
    fen: 'rn1qkbnr/ppp2p1p/3p2p1/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    moves: ['f3e5', 'g4d1', 'c4f7', 'e8e7', 'c3d5'],
    mate: true,
    explanation:
      'Чёрные связали коня слоном g4 и думали, что конь не сдвинется. Но Кxe5! — и если чёрные жадно берут ферзя, лёгкие фигуры белых ставят мат: Сxf7+ Крe7, Кd5#.',
  },
  {
    id: 'petrov',
    title: 'Ловушка в защите Петрова',
    goal: 'Белые: выиграй ферзя',
    fen: 'rnbqkb1r/pppp1ppp/5n2/4N3/8/8/PPPPQPPP/RNB1KB1R w KQkq - 2 5',
    moves: ['e5c6', 'f8e7', 'c6d8'],
    mate: false,
    explanation:
      'Король и ферзь белых стоят на одной линии e. Конь уходит с шахом (вскрытый шах ферзём e2) и одновременно нападает на ферзя d8. Чёрные защищаются от шаха — и теряют ферзя.',
  },
  {
    id: 'englund',
    title: 'Гамбит Энглунда',
    goal: 'Чёрные: поставь мат',
    fen: 'r1b1kbnr/pppp1ppp/2n5/4P3/8/2B2N2/PqP1PPPP/RN1QKB1R b KQkq - 1 6',
    moves: ['f8b4', 'd1d2', 'b4c3', 'd2c3', 'b2c1'],
    mate: true,
    explanation:
      'Белые увели слона на c3, чтобы поймать ферзя. Но Сb4! связывает слона, а после разменов на c3 ферзь чёрных ставит мат на c1 — король белых не успел рокироваться.',
  },
  {
    id: 'blackburne',
    title: 'Ловушка Блэкберна',
    goal: 'Чёрные: поставь мат',
    fen: 'r1b1kbnr/pppp1Npp/8/6q1/2BnP3/8/PPPP1PPP/RNBQK2R b KQkq - 0 5',
    moves: ['g5g2', 'h1f1', 'g2e4', 'c4e2', 'd4f3'],
    mate: true,
    explanation:
      'Белые съели пешку f7 и напали на ладью h8, но забыли о своём короле. Фxg2, затем Фxe4+, и конь ставит мат на f3 — король зажат своими же фигурами.',
  },
]

export const ALL_PUZZLES = [...PUZZLES, ...TRAPS]
