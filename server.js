/**
 * Created by Jacob Xie on 12/17/2019.
 */

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = 8000;
app.listen(port, () => console.log(`App listening on port ${port}`));
