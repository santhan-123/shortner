const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const shortId = require('shortid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection

const uri = 'mongodb+srv://santhankumarkotha:159159Ls@cluster0.hbixazk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));


// Routes
app.post('/shorten', async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = shortId.generate();

  await ShortUrl.create({ full: fullUrl, short: shortUrl });
  res.json({ shortUrl });
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await ShortUrl.findOne({ short: shortUrl });

  if (!url) return res.sendStatus(404);

  url.clicks++;
  url.save();

  res.redirect(url.full);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));