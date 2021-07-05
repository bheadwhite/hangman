const newLeader = (req, res) => {
  const gameState = req.session.hangman;
  const db = req.app.get('db');
  const { name } = req.body;
  if (gameState.winner && name != null) {
    db.insertNewLeader({
      name,
      points: gameState.points,
      word: req.session.wordToGuess,
    })
      .then(() => {
        res.sendStatus(200);
        return;
      })
      .catch((e) => {
        res.send(400).send(e);
        return;
      });
  } else {
    res.status(400).send({ ...gameState, name });
    return;
  }
};

const getLeaderBoard = async (req, res) => {
  const db = req.app.get('db');
  const leaderboard = await db.getLeaderboard().then(res);
  res.status(200).send(leaderboard);
};

module.exports = {
  newLeader,
  getLeaderBoard,
};
