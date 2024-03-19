export type PointsTable = {
  [key: string]: PointsTableInfo;
};

export type PointsTableInfo = {
  totalMatchesPlayed: number;
  totalInningsPlayed: number;
  totalMatchesWin: number;
  totalMatchesLost: number;
  totalMatchesDrawn: number;
  winPoints: number;
  bonusPoints: number;
  totalPoints: number;
  totalRuns: number;
  totalWickets: number;
  totalOver: number;
  average: number;
  opponentRuns: number;
  opponentOvers: number;
  opponentWicket: number;
  runRate: number;
  strikeRate: number;
  averageOverPerInnings: number;
  maxScorePossible: number;
};
