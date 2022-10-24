const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const app = express();
const publicPath = path.resolve(__dirname, './public');
/*const logMiddleware = require('./src/middleware/logMiddleware');*/
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rememberLoggedUser = require('./src/middleware/rememberLoggedUser');

// connection to db
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()

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

//Middlewares
app.use(rememberLoggedUser);
//

/*app.use(logMiddleware);*/

//Routes
const userRouter = require('./src/routes/userRouter');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRoutes');
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

//Server
app.listen(PORT, () => console.log(`[server] running at port ${PORT}`));
