const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const app = express();
const publicPath = path.resolve(__dirname, './public');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rememberLoggedUser = require('./src/middleware/rememberLoggedUser');

//EJS configuration
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));
app.use(cookieParser());
app.use(session({ 
    secret: 'Secreto',
    resave: false,
    saveUninitialized: false
}));
app.use(rememberLoggedUser);

//Middlewares
app.use(rememberLoggedUser);

//Routes
const userRouter = require('./src/routes/userRouter');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRoutes');
const apiRouter = require('./src/routes/api');

app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  res.status(404).render('./404');
});

//Server
app.listen(PORT, () => console.log(`[server] running at port ${PORT}`));
