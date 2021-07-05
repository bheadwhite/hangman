const express = require('express');
const app = express();
require('dotenv').config();
const session = require('express-session');
const path = require('path');
const massive = require('massive');
const game = require('./controllers/gameController');
const leaderCntrlr = require('./controllers/leaderboardController');

const isProdEnv = process.env.MY_LOCAL_DEVELOPMENT == null;

if (isProdEnv) {
  app.set('trust proxy', 1); // trust first proxy
}

app.use(
  express.json(),
  session({
    saveUninitialized: true,
    secret: 'asdlfkjasdlkfj',
    resave: false,
    cookie: {
      secure: isProdEnv,
    },
  }),
  express.static(path.join(__dirname, '..', 'build')),
);
//TODO: setup tables in heroku.

massive({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbinstance) => {
  app.set('db', dbinstance);
  console.log('dbconnected');
});

const PORT = process.env.PORT || 8080;

// game endpoints
app.get(`/api/initGame`, game.initGame);
app.get(`/api/newGame`, game.newGame);
app.post(`/api/guess`, game.guess);

// leaderboard
app.get('/api/getLeaderboard', leaderCntrlr.getLeaderBoard);
app.post('/api/newLeader', leaderCntrlr.newLeader);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
