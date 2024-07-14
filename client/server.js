const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.CLIENT_PORT || 3001;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Client server is running on port ${PORT}`);
});