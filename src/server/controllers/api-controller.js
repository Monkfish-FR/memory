/**
 * Get all scores
 */
exports.scoresAll = async (req, res) => {
  res.send([
    {
      score: 42000,
    },
    {
      score: 12345,
    },
  ]);
};
