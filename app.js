const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
// const methodOverride = require('method-override');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRoutes');
const app = express();


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
// app.use(methodOverride('_method'));
//app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use('/', mainRouter);
app.use('/products', productRouter);

app.listen(PORT, () => console.log(`[server] running at port ${PORT}`));


