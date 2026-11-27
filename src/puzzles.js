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
  // From the Lichess puzzle database (CC0, database.lichess.org): mate in 3 and hard mate in 2, sorted by rating
  { id: 'lc_9Yd1m', level: 'hard', fen: 'r5k1/7p/3P2pP/2p2b2/1p6/pP2qBQ1/P1P5/1K1R4 b - - 1 32', moves: ['f5c2', 'b1c2', 'e3c3', 'c2b1', 'c3b2'] }, // Lichess 9Yd1m, рейтинг 1805
  { id: 'lc_mzSqk', level: 'hard', fen: 'r1bq1rk1/1p4p1/4p3/pP2b2Q/3p4/P2B4/2P3PP/R3K2R w KQ - 3 24', moves: ['d3h7', 'g8h8', 'h7g6', 'h8g8', 'h5h7'] }, // Lichess mzSqk, рейтинг 1808
  { id: 'lc_6THuB', level: 'hard', fen: 'r2k1b1r/1p1P1p2/p4Ppp/q4b2/2P4B/8/PK2Q1PP/3R1B1R b - - 0 18', moves: ['f8a3', 'b2a1', 'a5c3', 'e2b2', 'a3b2'] }, // Lichess 6THuB, рейтинг 1827
  { id: 'lc_AWceU', level: 'hard', fen: '3r1k2/3pRpr1/3P2qp/p1p5/2PbR3/PP3QPp/5P1K/8 w - - 5 31', moves: ['e7e8', 'd8e8', 'e4e8', 'f8e8', 'f3a8'] }, // Lichess AWceU, рейтинг 1875
  { id: 'lc_ieIFM', level: 'hard', fen: '1k2r3/Rpp2ppp/5n2/1P6/N2r4/8/1P3PPP/R5K1 w - - 5 20', moves: ['a7a8', 'b8a8', 'a4b6', 'a8b8', 'a1a8'] }, // Lichess ieIFM, рейтинг 1892
  { id: 'lc_aRdSg', level: 'hard', fen: '5rk1/pp3p1p/5Q2/3B4/6b1/6P1/Pq3r1P/3R2K1 w - - 0 23', moves: ['d5f7', 'f8f7', 'd1d8', 'f7f8', 'd8f8'] }, // Lichess aRdSg, рейтинг 1895
  { id: 'lc_6f20D', level: 'hard', fen: '5r2/pp2R2p/2b3pk/1P6/5rq1/3B4/P2Q2PP/5R1K b - - 0 31', moves: ['g4g2', 'd2g2', 'f4f1', 'd3f1', 'f8f1'] }, // Lichess 6f20D, рейтинг 1926
  { id: 'lc_OBdCy', level: 'hard', fen: '1R6/5pkp/p2Qp1p1/3p2q1/3P4/2P4P/r4PP1/6K1 w - - 5 31', moves: ['d6f8', 'g7f6', 'f8h8', 'f6f5', 'h8e5'] }, // Lichess OBdCy, рейтинг 1935
  { id: 'lc_fKaFY', level: 'hard', fen: '8/3Q4/2pp1k2/3q4/1P4K1/P5PP/8/8 b - - 4 46', moves: ['d5e4', 'g4h5', 'e4g6', 'h5h4', 'g6g5'] }, // Lichess fKaFY, рейтинг 1952
  { id: 'lc_5KQvU', level: 'hard', fen: '8/6p1/7p/8/6KP/Q5P1/8/4kq2 b - - 7 69', moves: ['h6h5', 'g4g5', 'f1f6', 'g5h5', 'f6f5'] }, // Lichess 5KQvU, рейтинг 1984
  { id: 'lc_n5ETt', level: 'hard', fen: '2kr3r/p1p1bpQp/4q3/8/1PP3P1/P2pP3/3N1P1P/3RKB1R b K - 2 17', moves: ['e6e3', 'f2e3', 'e7h4'] }, // Lichess n5ETt, рейтинг 2003
  { id: 'lc_gg1Ar', level: 'hard', fen: '3rr3/q2k4/3P2p1/1p1P1n1p/4N3/7P/P4PP1/2R1R1K1 w - - 1 28', moves: ['e4f6', 'd7d6', 'c1c6'] }, // Lichess gg1Ar, рейтинг 2003
  { id: 'lc_jvGTJ', level: 'hard', fen: '5k2/1p2r2p/p3R1p1/5p2/1qPQ4/7P/5PP1/6K1 w - - 6 36', moves: ['d4h8', 'f8f7', 'e6f6'] }, // Lichess jvGTJ, рейтинг 2013
  { id: 'lc_yC7XM', level: 'hard', fen: 'rnb2k1r/pp3pqp/1b6/1Qp3B1/4B3/3P1p2/PP3PPP/R3R1K1 w - - 0 17', moves: ['b5e8', 'f8e8', 'e4c6', 'e8f8', 'e1e8'] }, // Lichess yC7XM, рейтинг 2022
  { id: 'lc_uxoBh', level: 'hard', fen: 'r1b1k2r/pp2ppbp/2n1qnp1/1B2p3/P7/3R1N2/2PB1PPP/3Q1RK1 w kq - 3 18', moves: ['d3d8', 'e8d8', 'd2a5', 'd8e8', 'd1d8'] }, // Lichess uxoBh, рейтинг 2029
  { id: 'lc_lEKqQ', level: 'hard', fen: '3rrk2/5bR1/2p2p1p/5N2/p3PN2/2b2P2/n7/1K4R1 w - - 2 37', moves: ['g7f7', 'f8f7', 'g1g7', 'f7f8', 'f4g6'] }, // Lichess lEKqQ, рейтинг 2032
  { id: 'lc_89nUp', level: 'hard', fen: '2kr1b1r/ppp3pp/5p2/5n2/1q4PP/1B2R3/PBP5/2KR4 w - - 0 22', moves: ['b3e6', 'd8d7', 'e6d7', 'c8d8', 'e3e8'] }, // Lichess 89nUp, рейтинг 2039
  { id: 'lc_5brcR', level: 'hard', fen: '1rbq3k/1p5p/p1np1N1Q/1N2p3/2P1P3/2KB4/PP3r1P/R5R1 b - - 0 21', moves: ['d8a5', 'b2b4', 'a5b4'] }, // Lichess 5brcR, рейтинг 2040
  { id: 'lc_QyY0a', level: 'hard', fen: 'rn3rk1/pp3ppp/2pb4/5p2/3Pn2q/3B1N2/PPP2PPP/R1BQR1K1 b - - 11 12', moves: ['d6h2', 'f3h2', 'h4f2', 'g1h1', 'e4g3'] }, // Lichess QyY0a, рейтинг 2044
  { id: 'lc_lwOwi', level: 'hard', fen: '2b3k1/1p2p1Bp/1q1p2p1/1P6/2P1p3/1N4P1/3QPr1P/5RK1 b - - 0 20', moves: ['f2f1', 'g1f1', 'c8h3', 'f1e1', 'b6g1'] }, // Lichess lwOwi, рейтинг 2047
  { id: 'lc_KPtgG', level: 'hard', fen: '1k4r1/p4p2/2Q1p3/3n4/3P4/4BK1b/PP4r1/R5R1 b - - 4 29', moves: ['g8g3', 'f3e4', 'g3e3'] }, // Lichess KPtgG, рейтинг 2079
  { id: 'lc_A994R', level: 'hard', fen: '7k/2Q3p1/p1p3rp/P1p1N1q1/3pP3/1P1P1r2/2P2R1P/5R1K b - - 1 36', moves: ['g5g2', 'f2g2', 'f3f1', 'g2g1', 'f1g1'] }, // Lichess A994R, рейтинг 2092
  { id: 'lc_qY4rq', level: 'hard', fen: '6k1/pp3p2/2q1pQ2/8/6NP/1B1b2PK/PP3P2/8 b - - 4 33', moves: ['d3f1', 'h3h2', 'c6g2'] }, // Lichess qY4rq, рейтинг 2098
  { id: 'lc_5Rr4j', level: 'hard', fen: '7k/r6r/pqp2pQR/5P2/2pPp3/2P4P/PP4P1/6K1 w - - 1 29', moves: ['g6e8', 'h8g7', 'h6g6'] }, // Lichess 5Rr4j, рейтинг 2129
  { id: 'lc_zJ0wz', level: 'hard', fen: '8/3R2pp/1R6/2p2k2/p1P5/P4Pb1/3Br2r/6K1 w - - 1 45', moves: ['d7f7', 'f5e5', 'd2c3'] }, // Lichess zJ0wz, рейтинг 2157
  { id: 'lc_4CcuZ', level: 'hard', fen: '2k5/ppp2p2/2p5/2b4Q/2K1N3/P6P/1qP2PP1/R4R2 b - - 0 19', moves: ['b2c2', 'e4c3', 'b7b5', 'c4c5', 'c2c3'] }, // Lichess 4CcuZ, рейтинг 2230
  { id: 'lc_VWD3v', level: 'hard', fen: 'r5r1/p4Rbp/4p1p1/1B4P1/5B2/1P3K1k/P7/8 w - - 0 29', moves: ['f4g3', 'e6e5', 'b5f1'] }, // Lichess VWD3v, рейтинг 2236
  { id: 'lc_H4omd', level: 'hard', fen: '6k1/p4pr1/P5rp/1Pb1p2q/2B1Ppn1/5N2/Q2R1P1N/6RK b - - 6 32', moves: ['h5h2', 'f3h2', 'g4f2', 'd2f2', 'g6g1'] }, // Lichess H4omd, рейтинг 2241
  { id: 'lc_tkFSa', level: 'hard', fen: 'rnb1r1k1/1p3p2/2pq3p/p2p2p1/3P2nB/2NBPK2/PPQ1NPP1/R6R b - - 3 15', moves: ['g4h2', 'h1h2', 'g5g4'] }, // Lichess tkFSa, рейтинг 2370
  { id: 'lc_7venx', level: 'hard', fen: 'r2q1r2/p1pp3k/1p5p/4Bp1Q/2B5/8/PPb2PPP/R5K1 w - - 1 18', moves: ['c4g8', 'f8g8', 'h5f7', 'g8g7', 'f7g7'] }, // Lichess 7venx, рейтинг 2387
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
  {
    id: 'siberian',
    title: 'Сибирская ловушка',
    goal: 'Чёрные: найди ловушку и поставь мат',
    fen: 'r1b1kb1r/ppqp1ppp/2n1p3/8/2B1P1n1/2N2N1P/PP2QPP1/R1B2RK1 b kq - 0 9',
    moves: ['c6d4', 'f3d4', 'c7h2'],
    mate: true,
    explanation:
      'Кd4! нападает на ферзя e2. Но взять коня нельзя: как только конь f3 уходит, поле h2 остаётся без защиты, и ферзь c7 вместе с конём g4 ставят мат на h2. А если ферзь уйдёт — мат Фh2# всё равно.',
  },
]

export const ALL_PUZZLES = [...PUZZLES, ...TRAPS]
