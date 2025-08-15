const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const urlDatabase = {};

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

app.post('/shortener', (req, res) => {
  const {url} = req.body;
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let shortCode;
  do {
    shortCode = generateCode();
  } while (urlDatabase[shortCode]);

  urlDatabase[shortCode] = url;
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;

  res.json({ 
    shortCode,
    shortUrl });
});

app.get('/:code', (req, res) => {
  const originalUrl = urlDatabase[req.params.code];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port:  ${port}`);
});
