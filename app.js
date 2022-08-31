const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.listen(PORT, () => console.log(`[Server] running at port ${PORT}`));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/productCart', (req, res) => {
  res.render('./products/productCart');
});
