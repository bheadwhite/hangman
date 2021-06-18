const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

const PORT = 3001;

const WORD_URL = 'https://random-word-api.herokuapp.com/word?number=1';

app.get('/api/getWord', async (req, res) => {
  const { data } = await axios.get(WORD_URL);
  res.status(200).send(data);
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
