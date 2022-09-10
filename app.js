const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const app = express();
const publicPath = path.resolve(__dirname, './public');
const logmiddleware = require('./src/middleware/logMiddleware');

//EJS configuration
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

//Middlewares
app.use(logmiddleware);

//Routes
const userRouter = require('./src/routes/userRouter');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRoutes');
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

//Server
app.listen(PORT, () => console.log(`[server] running at port ${PORT}`));
