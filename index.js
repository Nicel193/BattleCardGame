const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'client')));

app.listen(3000, () => console.log('Server started on port 3000.'));
