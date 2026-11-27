// Puzzle list. Every puzzle was checked with scripts/solve.mjs:
// - the position has a forced mate in exactly `mateIn` moves (no faster mate);
// - every non-final move of the side to move is the only winning move.
// `moves` are in UCI format (from + to square). Even indexes = player, odd = opponent reply.

export const LEVELS = [
  { id: 'easy', title: 'Лёгкие', mateIn: 1 },
  { id: 'medium', title: 'Средние', mateIn: 2 },
  { id: 'hard', title: 'Сложные', mateIn: 3 },
  // Tactics by theme (from Lichess)
  { id: 'fork', title: 'Вилка', theme: true },
  { id: 'pin', title: 'Связка', theme: true },
  { id: 'skewer', title: 'Сквозной удар', theme: true },
  { id: 'discoveredAttack', title: 'Вскрытое нападение', theme: true },
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
  // From Lichess (CC0)
  { id: 'lc_GR481', level: 'easy', fen: '8/6qp/b6k/3pPQ2/2p3P1/5PKP/8/8 w - - 3 44', moves: ['f5h5'] }, // рейтинг 891
  { id: 'lc_nuE3E', level: 'easy', fen: 'r3kb1r/pppb2n1/5Bp1/3pp3/1q1P2Q1/4P3/P1PN1PPP/R3K2R w KQkq - 0 16', moves: ['g4g6'] }, // рейтинг 937
  { id: 'lc_R8uGL', level: 'easy', fen: 'R7/4qp2/6k1/2p1P1p1/8/7Q/5K2/3r4 w - - 2 44', moves: ['a8g8'] }, // рейтинг 958
  { id: 'lc_jO162', level: 'easy', fen: 'r6k/pp5p/2p1Pr2/8/5qP1/2Q1nN1K/PP2B2P/4B2R b - - 0 34', moves: ['f4g4'] }, // рейтинг 1018
  { id: 'lc_CbFm9', level: 'easy', fen: 'r2q2rk/p1p1b2n/2np2QN/1p2pp2/7P/2P5/PP1P1PP1/R1B1K2R w KQ - 1 19', moves: ['h6f7'] }, // рейтинг 1033
  { id: 'lc_qI2Ty', level: 'easy', fen: 'rn2kb1r/ppp1pppp/1q6/8/3P2Q1/2B5/PPb3PP/R3KBNR w KQkq - 0 11', moves: ['g4c8'] }, // рейтинг 1076
  { id: 'lc_fqAas', level: 'easy', fen: 'r1b3k1/pp3p1p/5qpB/8/2Bb4/Q7/PP3PPP/4rRK1 w - - 0 18', moves: ['a3f8'] }, // рейтинг 1163
  { id: 'lc_8KuLn', level: 'easy', fen: '7r/p5k1/6p1/4N3/P2P3q/5P2/8/3R1RK1 b - - 1 40', moves: ['h4h2'] }, // рейтинг 1177
  { id: 'lc_jjZya', level: 'easy', fen: 'r7/1p2kppp/3b4/1B3b2/1P6/2P2P2/1K4PP/r1NR3R b - - 0 24', moves: ['a1b1'] }, // рейтинг 1190
  { id: 'lc_Gm1eW', level: 'easy', fen: 'r4rk1/1p4pp/p2p4/2pPn3/P3Pp1q/2N1BP1b/1P2B3/R2Q1NRK b - - 4 25', moves: ['h3f1'] }, // рейтинг 1197
  { id: 'lc_813eT', level: 'easy', fen: 'rn1qkb1r/3pppp1/p1b4p/2p2N2/8/8/P1P1QPPP/R1B2RK1 w kq - 2 14', moves: ['f5d6'] }, // рейтинг 1213
  { id: 'lc_ecDMb', level: 'easy', fen: '8/5ppk/1Pp4r/P3p3/4P3/5PP1/3Q1q1P/3R3K b - - 2 44', moves: ['h6h2'] }, // рейтинг 1214
  { id: 'lc_GHMsU', level: 'easy', fen: 'r7/p4r2/1pp1N1pk/3p1P2/3Pb1P1/R7/PP5P/6K1 w - - 0 31', moves: ['a3h3'] }, // рейтинг 1278
  { id: 'lc_effQ7', level: 'easy', fen: '7k/pp4qp/4p3/b3B3/2p1N3/2Pr4/PP4PP/5RK1 w - - 0 23', moves: ['f1f8'] }, // рейтинг 1288
  { id: 'lc_giaGr', level: 'easy', fen: 'r7/pQ6/3kp1p1/2p2pN1/8/P3P3/3q1PPP/5K2 w - - 2 32', moves: ['g5f7'] }, // рейтинг 1290
  { id: 'lc_e8erC', level: 'easy', fen: 'r6r/ppp2p2/2np2kp/2b1PbqN/6Qp/3BP1P1/PPP2PP1/R3K2R w KQ - 2 16', moves: ['d3f5'] }, // рейтинг 1294
  { id: 'lc_tpzx2', level: 'easy', fen: '8/8/4p3/5p2/8/5kPK/4q3/2Q5 w - - 7 57', moves: ['c1f4'] }, // рейтинг 1299
  { id: 'lc_sYwKo', level: 'easy', fen: '1rb2rk1/2qnp3/3p1p1Q/2p1n2R/4P3/2pP2P1/1P2N1BP/R5K1 w - - 0 25', moves: ['h6h7'] }, // рейтинг 1301

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
  // From Lichess (CC0)
  { id: 'lc_LbsWl', level: 'medium', fen: 'r1b4r/1pqpkpp1/p3p3/7p/3nP1n1/2NB1N1P/PPP2PP1/R2Q1RK1 b - - 3 13', moves: ['d4f3', 'g2f3', 'c7h2'] }, // рейтинг 1208
  { id: 'lc_o212O', level: 'medium', fen: 'r1b1kb1r/pp2ppnp/6p1/4q3/6P1/2pBB3/PPPQ1P1P/2KR3R w kq - 0 14', moves: ['d3b5', 'e5b5', 'd2d8'] }, // рейтинг 1243
  { id: 'lc_zEPQq', level: 'medium', fen: 'r3kb1r/pp3ppp/3p4/Q1p5/2NP4/8/PP2qPPP/R1B3KR b kq - 0 16', moves: ['e2d1', 'a5e1', 'd1e1'] }, // рейтинг 1310
  { id: 'lc_Hok9q', level: 'medium', fen: '5r2/p2n2pk/2p4p/3p3Q/3P3P/1B2B1b1/PPP2P1q/RN2RK2 b - - 7 23', moves: ['f8f2', 'e3f2', 'h2f2'] }, // рейтинг 1312
  { id: 'lc_MBim6', level: 'medium', fen: '6k1/1Q3pp1/3R1q1p/8/2B5/P5P1/3r1P1P/1R4K1 b - - 0 32', moves: ['f6f2', 'g1h1', 'f2h2'] }, // рейтинг 1336
  { id: 'lc_1juLy', level: 'medium', fen: '1k6/1p3p1P/pr6/r2pp2Q/3P4/1Pq5/PR3P2/KR6 b - - 1 37', moves: ['a5a2', 'a1a2', 'c3a5'] }, // рейтинг 1364
  { id: 'lc_3UrJW', level: 'medium', fen: 'r6r/pp1bnpp1/2n1pk2/5qN1/8/2P3Q1/P2B1PPP/R4RK1 w - - 8 19', moves: ['g5e4', 'f5e4', 'g3g5'] }, // рейтинг 1377
  { id: 'lc_4nM0T', level: 'medium', fen: '1Q4r1/4k2p/2p3q1/3pP3/5P2/7Q/7P/1R5K b - - 0 35', moves: ['g6e4', 'h3g2', 'e4g2'] }, // рейтинг 1396
  { id: 'lc_x2pBa', level: 'medium', fen: '1k6/1p4pb/5p2/1Np2P1p/2B3P1/2Ppr1r1/PP1R1K2/3R4 b - - 5 29', moves: ['e3f3', 'f2e1', 'g3g1'] }, // рейтинг 1427
  { id: 'lc_RYDlf', level: 'medium', fen: 'r4r1k/6p1/p5Q1/2p2N1p/4p3/P6P/1q3PP1/5RK1 w - - 0 30', moves: ['g6h5', 'h8g8', 'f5e7'] }, // рейтинг 1469
  { id: 'lc_qeMdV', level: 'medium', fen: 'r1k2br1/pp5p/1nnP2p1/6B1/3P4/2P5/qP2Q1PP/5RK1 w - - 3 21', moves: ['e2e8', 'c6d8', 'e8d8'] }, // рейтинг 1486
  { id: 'lc_j040W', level: 'medium', fen: 'r1b1qk1r/pp1np1b1/4pnQ1/2p3N1/2P5/2N5/PP3PPP/R1B1K2R w KQ - 3 14', moves: ['g5e6', 'f8g8', 'g6g7'] }, // рейтинг 1515
  { id: 'lc_45wye', level: 'medium', fen: 'r1b3kr/ppNqRp2/8/6p1/2Bb1p2/BP3QnP/P1P3PK/R7 b - - 2 19', moves: ['h8h3', 'g2h3', 'd7h3'] }, // рейтинг 1550
  { id: 'lc_b6wzk', level: 'medium', fen: 'r2q1r1k/ppp3bp/4b1p1/4N3/3Q1nP1/1P6/PBPP1P1P/2KR3R w - - 3 17', moves: ['e5g6', 'h7g6', 'd4g7'] }, // рейтинг 1652
  { id: 'lc_y4qfJ', level: 'medium', fen: '5r1k/p3r2p/1pQ2p2/2q5/4p3/P5R1/1P3PR1/1K6 w - - 2 32', moves: ['c6f6', 'f8f6', 'g3g8'] }, // рейтинг 1654
  { id: 'lc_pRpVG', level: 'medium', fen: '3Q1rk1/ppQ3p1/8/2P4N/7p/1P3qpP/P5R1/7K b - - 4 34', moves: ['f3f1', 'g2g1', 'f1h3'] }, // рейтинг 1673
  { id: 'lc_7GXog', level: 'medium', fen: 'r2q2k1/pppn1pp1/3p4/3P2N1/7R/3Q4/P4PPK/4r3 w - - 0 25', moves: ['h4h8', 'g8h8', 'd3h7'] }, // рейтинг 1726
  { id: 'lc_6qGds', level: 'medium', fen: '8/2R5/5k2/5n2/5RK1/7r/8/8 b - - 18 54', moves: ['h3g3', 'g4h5', 'g3g5'] }, // рейтинг 1776
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

  // Tactics by theme, from Lichess (CC0). mate: false -> exact moves required
  { id: 'lc_kH0Jh', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: 'rnb1k2r/1p3ppp/p3p3/2p1P3/P1B2Bnq/2P5/1P3PPP/RN1QR1K1 b kq - 2 12', moves: ['h4f2', 'g1h1', 'f2f4'] }, // рейтинг 1226
  { id: 'lc_0PV5p', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: 'r1b1k1r1/p2n1pb1/2pR1np1/q3p1B1/4P3/1PN2Q2/P1P2PP1/2K2BNR b q - 0 14', moves: ['a5a3', 'c1b1', 'a3d6'] }, // рейтинг 1284
  { id: 'lc_ox8Ih', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: '1rr2k2/4p2p/p2q2p1/1p4n1/1Pp1B3/P6Q/5PPP/2R2RK1 w - - 16 35', moves: ['h3h6', 'f8g8', 'h6g5'] }, // рейтинг 1312
  { id: 'lc_gE4Oi', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: '2k3rr/1pp3pp/p3p2q/5p2/8/P2PQ1RP/1PP2PP1/R5K1 b - - 1 22', moves: ['f5f4', 'e3a7', 'f4g3'] }, // рейтинг 1327
  { id: 'lc_T1lK1', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: 'r1b1k2r/p2n1p1p/2npp1p1/q1p3P1/1p2PP2/3PNN1P/PbPB2B1/R2QK2R w KQkq - 0 13', moves: ['e3c4', 'a5c7', 'c4b2'] }, // рейтинг 1353
  { id: 'lc_NRwby', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: 'r1b1k1nr/ppp2ppp/3p4/3Pq3/1b6/2N5/PP2BPPP/R1BQK2R w KQkq - 0 11', moves: ['d1a4', 'c8d7', 'a4b4'] }, // рейтинг 1362
  { id: 'lc_PdVr2', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: '8/p6p/1np5/4p1k1/2P3p1/1P4NP/P2r4/4R1K1 w - - 0 29', moves: ['g3e4', 'g5f4', 'e4d2'] }, // рейтинг 1396
  { id: 'lc_R7jpl', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: 'r3k2r/pp2bpp1/2p1pn1p/1q5P/2PP1B2/5N2/PP2QPP1/1K1R3R b kq - 0 17', moves: ['b5f5', 'b1a1', 'f5f4'] }, // рейтинг 1449
  { id: 'lc_7tFi6', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: 'rnbqkb1r/pp1ppp2/2p2n2/6Bp/3P4/4P3/PPP1BPPP/RN1QK1NR b KQkq - 0 5', moves: ['d8a5', 'b1d2', 'a5g5'] }, // рейтинг 1475
  { id: 'lc_xQRjP', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: 'r1bq2k1/pp4pp/4pr2/4Bp2/2Bn4/P7/1PP2PPP/R2QK2R b KQ - 1 15', moves: ['d8a5', 'c2c3', 'a5e5'] }, // рейтинг 1505
  { id: 'lc_zYa37', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: 'r1bqr1k1/pp3p1p/2p3p1/3p4/4PP2/1P1B1Q2/P1P3PP/R4RK1 b - - 2 16', moves: ['d5e4', 'd3e4', 'd8d4'] }, // рейтинг 1516
  { id: 'lc_bUuZQ', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: '8/8/6p1/4r1k1/R6p/7P/5PK1/8 w - - 8 52', moves: ['f2f4', 'g5f6', 'f4e5'] }, // рейтинг 1546
  { id: 'lc_ynPGV', level: 'fork', goal: 'Чёрные: найди вилку', mate: false, fen: '6k1/3P4/6p1/4qp2/5nP1/6Q1/5N2/6K1 b - - 0 44', moves: ['f4e2', 'g1g2', 'e5g3'] }, // рейтинг 1589
  { id: 'lc_LY7mw', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: '8/8/1P2Q3/6pp/2p2k2/2r3bK/6P1/8 w - - 4 49', moves: ['e6f6', 'f4e4', 'f6c3'] }, // рейтинг 1606
  { id: 'lc_7jlmz', level: 'fork', goal: 'Белые: найди вилку', mate: false, fen: 'rnb1k2r/ppp1qpp1/7p/2b1p3/4n3/2P2N2/PP2BPPP/RNBQ1RK1 w kq - 0 10', moves: ['d1a4', 'c8d7', 'a4e4'] }, // рейтинг 1700
  { id: 'lc_WsAyC', level: 'pin', goal: 'Чёрные: используй связку', mate: false, fen: '8/1p4k1/2p5/2q5/5p1r/1P6/P4QP1/3R2K1 b - - 3 41', moves: ['h4h1', 'g1h1', 'c5f2'] }, // рейтинг 1082
  { id: 'lc_2VaIU', level: 'pin', goal: 'Чёрные: используй связку', mate: false, fen: '4r2k/p7/2Q2n1p/5qp1/3P3P/5P2/PP1R4/2K3R1 b - - 0 25', moves: ['e8c8', 'c6c8', 'f5c8'] }, // рейтинг 1161
  { id: 'lc_9IVTZ', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '6R1/p7/6Rp/2kp4/Pp3q2/1P3P2/2P1n2P/7K w - - 7 42', moves: ['g8c8', 'c5d4', 'g6g4'] }, // рейтинг 1272
  { id: 'lc_03jgY', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: 'r5k1/1pR4N/3p2n1/p2Ppr2/8/7P/1P1Q1P2/q3K1R1 w - - 1 25', moves: ['c7c1', 'a1c1', 'd2c1'] }, // рейтинг 1427
  { id: 'lc_hig1v', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: 'r1q1k1nr/ppp1b2p/5p2/6B1/2n5/2Q3R1/PPP3PP/4R1K1 w kq - 0 19', moves: ['g5f6', 'g8f6', 'c3f6'] }, // рейтинг 1478
  { id: 'lc_JhPjY', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: 'r4rk1/1Q5p/p1p3q1/3p4/8/4R3/P1p2PPP/5RK1 w - - 0 27', moves: ['e3g3', 'g6g3', 'h2g3'] }, // рейтинг 1505
  { id: 'lc_61ViX', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '6rk/1b3r1p/p3pPpQ/1q4PP/3pN3/3p3R/1PP3K1/4R3 w - - 0 37', moves: ['h5g6', 'g8g6', 'h6g6'] }, // рейтинг 1572
  { id: 'lc_OmSDv', level: 'pin', goal: 'Чёрные: используй связку', mate: false, fen: '7r/p7/4pkb1/P2p4/1PpPpPNr/2P4p/4KP1P/R5R1 b - - 6 40', moves: ['h4g4', 'g1g4', 'g6h5'] }, // рейтинг 1601
  { id: 'lc_YB7Qe', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: 'rnq1k2r/pb2bppp/2p2n2/1p1p2B1/B7/2N2Q2/PPP2PPP/R3R1K1 w kq - 0 14', moves: ['g5f6', 'g7f6', 'f3f6'] }, // рейтинг 1687
  { id: 'lc_wB5x7', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '4qrk1/p1p3p1/3p1pQp/7P/4NR2/b3P3/5P2/6K1 w - - 2 35', moves: ['e4f6', 'f8f6', 'g6e8'] }, // рейтинг 1687
  { id: 'lc_1OT9B', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '5r1k/pp1b1p1p/3p2p1/3N4/1B1brP2/P6P/2P3P1/3R1RK1 w - - 2 22', moves: ['d1d4', 'e4d4', 'b4c3'] }, // рейтинг 1700
  { id: 'lc_9J5Zn', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '4rrk1/pp4pp/2p5/5P2/6pq/1P6/PBQ2b1P/R5RK w - - 2 28', moves: ['c2c4', 'f8f7', 'g1g4'] }, // рейтинг 1716
  { id: 'lc_m3nDr', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '7k/p1p3r1/1pqp3p/8/PP6/8/1Q4pP/4R1K1 w - - 0 41', moves: ['e1e7', 'c6c1', 'b2c1'] }, // рейтинг 1720
  { id: 'lc_5kiJp', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: 'r4rk1/pp4p1/1bn1pqp1/3p1p2/3N4/2P1PBP1/PP3PP1/R2QK2R w KQ - 4 17', moves: ['d4e6', 'f6e6', 'f3d5'] }, // рейтинг 1747
  { id: 'lc_OcdD6', level: 'pin', goal: 'Белые: используй связку', mate: false, fen: '1Q2q3/pb1pk1r1/5R2/1p1p4/3p4/2P5/P1P3PP/6K1 w - - 2 32', moves: ['b8d6', 'e7d8', 'f6f8'] }, // рейтинг 1749
  { id: 'lc_Xh0Oz', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '1Q6/8/B7/1K6/P7/4k3/4n3/4q3 b - - 2 60', moves: ['e1b1', 'b5c6', 'b1b8'] }, // рейтинг 1113
  { id: 'lc_ou8FQ', level: 'skewer', goal: 'Белые: найди сквозной удар', mate: false, fen: '3r4/2qk1pP1/p2pp3/8/n2N4/2P5/P1P3b1/4RRK1 w - - 1 28', moves: ['f1f7', 'd7c8', 'f7c7'] }, // рейтинг 1148
  { id: 'lc_S4U9T', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '8/6pk/1pr5/6R1/6P1/P3P3/1P1R1K2/7r b - - 0 44', moves: ['h1h2', 'f2g3', 'h2d2'] }, // рейтинг 1168
  { id: 'lc_3zafp', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '2k2B2/2p2R1p/pp6/2b5/4r3/1B4P1/P6r/2R2K2 b - - 1 30', moves: ['h2h1', 'f1g2', 'h1c1'] }, // рейтинг 1204
  { id: 'lc_efaEo', level: 'skewer', goal: 'Белые: найди сквозной удар', mate: false, fen: '2Q5/p7/5kpp/3p4/3q4/8/P4PP1/6K1 w - - 1 33', moves: ['c8h8', 'f6e6', 'h8d4'] }, // рейтинг 1274
  { id: 'lc_JAUSA', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: 'Q2K4/8/2N5/7k/8/6qP/8/6n1 b - - 3 67', moves: ['g3g8', 'd8c7', 'g8a8'] }, // рейтинг 1290
  { id: 'lc_ECpJl', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '5Q2/1p1R2bk/1Bn3p1/4p3/P3P3/3K3p/7P/6q1 b - - 5 37', moves: ['g1d1', 'd3c3', 'd1d7'] }, // рейтинг 1348
  { id: 'lc_5YLUj', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '6k1/8/5Rp1/1bN4p/1P6/7P/2P2K1P/4r3 b - - 5 44', moves: ['e1f1', 'f2e3', 'f1f6'] }, // рейтинг 1394
  { id: 'lc_EuiXU', level: 'skewer', goal: 'Белые: найди сквозной удар', mate: false, fen: '3r4/1p6/nq2p1kp/3b1pp1/1B1Pp3/P1Q1P1NP/5PP1/2R3K1 w - - 2 31', moves: ['b4a5', 'b6d6', 'a5d8'] }, // рейтинг 1397
  { id: 'lc_QiBfO', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: 'r7/6kp/1pp3q1/p1n2b2/2P1np1P/1P3Q2/P4PB1/3RNRK1 b - - 1 28', moves: ['f5g4', 'f3f4', 'g4d1'] }, // рейтинг 1455
  { id: 'lc_jR5zn', level: 'skewer', goal: 'Белые: найди сквозной удар', mate: false, fen: '3R4/1bP2pp1/2n5/B1kNp3/P1P1P3/3n2P1/5q2/1K6 w - - 6 37', moves: ['a5b6', 'c5c4', 'b6f2'] }, // рейтинг 1520
  { id: 'lc_Tmffn', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '8/5p2/5Qpk/7p/4B2P/5KPq/8/8 b - - 17 69', moves: ['h3f1', 'f3e3', 'f1f6'] }, // рейтинг 1609
  { id: 'lc_mcTNk', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: 'k1r1r3/1b1n1p2/p2p4/3PqP2/P1RQP3/8/2B1N1PP/1R4K1 b - - 0 35', moves: ['e5d4', 'c4d4', 'c8c2'] }, // рейтинг 1617
  { id: 'lc_u1nBK', level: 'skewer', goal: 'Белые: найди сквозной удар', mate: false, fen: 'r1b2bnr/ppp2Bpp/3k4/3p2q1/3n2N1/8/PPPP3P/RNB1QRK1 w - - 2 12', moves: ['e1g3', 'd6e7', 'g3c7'] }, // рейтинг 1662
  { id: 'lc_F8gsy', level: 'skewer', goal: 'Чёрные: найди сквозной удар', mate: false, fen: '8/3k2p1/4R2p/3P1B2/6K1/6P1/7r/5b2 b - - 5 48', moves: ['f1h3', 'g4f3', 'h3f5'] }, // рейтинг 1668
  { id: 'lc_7YZW3', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: '2r2r2/p3qpk1/1p2pNpp/4P3/2np2PQ/P1P5/5P1P/R3R1K1 w - - 0 30', moves: ['f6h5', 'g6h5', 'h4e7'] }, // рейтинг 1167
  { id: 'lc_fXyO1', level: 'discoveredAttack', goal: 'Чёрные: найди вскрытое нападение', mate: false, fen: '6n1/1b3p2/4k2p/P2pBp2/2PP1P2/1B5P/6K1/8 b - - 0 43', moves: ['d5c4', 'd4d5', 'b7d5'] }, // рейтинг 1172
  { id: 'lc_SiYhM', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: 'r1b1k1nr/1p3pbp/p3p1p1/2p5/2P2q2/2NP1B2/PP4PP/1R1Q1R1K w kq - 0 16', moves: ['f3c6', 'b7c6', 'f1f4'] }, // рейтинг 1219
  { id: 'lc_yh5Bx', level: 'discoveredAttack', goal: 'Чёрные: найди вскрытое нападение', mate: false, fen: '8/2Q2pkp/p3p1p1/2b5/2q2P2/7P/6PK/3R4 b - - 1 38', moves: ['c5g1', 'h2g1', 'c4c7'] }, // рейтинг 1303
  { id: 'lc_Yzchr', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: 'rnb2rk1/ppp2ppp/8/4P3/3q4/2NBn3/PPP3PP/R2QR1K1 w - - 0 15', moves: ['d3h7', 'g8h7', 'd1d4'] }, // рейтинг 1332
  { id: 'lc_Kvpm2', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: 'r1b2rk1/1p2npp1/p2p1n1p/4pP2/3N4/qB2Q1N1/P1P3PP/R4RK1 w - - 0 20', moves: ['b3f7', 'f8f7', 'e3a3'] }, // рейтинг 1358
  { id: 'lc_8gyhu', level: 'discoveredAttack', goal: 'Чёрные: найди вскрытое нападение', mate: false, fen: '1n2kb1r/rb1p1ppp/pq2p3/1p1nP3/2P1B3/P1N2N2/1PP2PPP/R1BQ1RK1 b k - 0 11', moves: ['d5c3', 'b2c3', 'b7e4'] }, // рейтинг 1359
  { id: 'lc_BQNxL', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: '6r1/p1p3Bk/1p1pp2P/5n1Q/2PPb3/K1b1P2R/P5r1/8 w - - 4 31', moves: ['h5f7', 'g2g7', 'h6g7'] }, // рейтинг 1456
  { id: 'lc_0wM6y', level: 'discoveredAttack', goal: 'Чёрные: найди вскрытое нападение', mate: false, fen: '2k5/pp1r4/6p1/2p1n3/5R1Q/1PN1P1p1/P1PP3q/R4K2 b - - 6 26', moves: ['g3g2', 'f1e2', 'g2g1q'] }, // рейтинг 1507
  { id: 'lc_1ItNk', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: 'r1r5/3b1kp1/2pb3p/1p1P4/p3Bp1B/2P2P2/PP5P/2KRR3 w - - 0 23', moves: ['d5c6', 'd7c6', 'd1d6'] }, // рейтинг 1531
  { id: 'lc_5Iw55', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: 'r4rk1/pp3ppp/3p4/3P4/5P2/4b2b/PqBQ1P1P/R3R1K1 w - - 0 19', moves: ['c2h7', 'g8h7', 'd2b2'] }, // рейтинг 1601
  { id: 'lc_A5Icj', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: 'r4k2/2p2p1p/pp2r1p1/4P1Q1/2P2R2/6P1/PP1q1nKP/R7 w - - 7 27', moves: ['f4f7', 'f8f7', 'g5d2'] }, // рейтинг 1604
  { id: 'lc_SLiDc', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: '2b2r1k/pp6/3RPnpp/5P2/P7/1P4P1/6BP/6K1 w - - 0 36', moves: ['e6e7', 'f8e8', 'd6f6'] }, // рейтинг 1651
  { id: 'lc_dbwOk', level: 'discoveredAttack', goal: 'Белые: найди вскрытое нападение', mate: false, fen: '8/5pB1/6p1/2r5/3R2p1/2k2bP1/5K1P/8 w - - 16 41', moves: ['d4g4', 'c3b3', 'f2f3'] }, // рейтинг 1720
  { id: 'lc_QZs83', level: 'discoveredAttack', goal: 'Чёрные: найди вскрытое нападение', mate: false, fen: 'r3r1k1/p1pb1pp1/1pnb2qp/1B1NN3/3P4/P6P/1PP2PP1/R2Q1RK1 b - - 2 15', moves: ['c6e5', 'd4e5', 'd7b5'] }, // рейтинг 1764
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
