const express = require("express");
// const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;


//Parsing Middleware
//Parsing application
app.use(bodyParser.urlencoded({ extended: false }));

//Parsing application/json
app.use(bodyParser.json());

//Static Files
app.use(express.static('public'));

// Templating Engine
// app.engine('hbs', exphbs({ extname: '.hbs' }));
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//Connect to Db
pool.getConnection((err, connection) => {
    if (err) throw err; //no connection 
    console.log(`Connected as ID ${connection.threadId}`)
})


const routes = require('./server/routes/user');
app.use('/', routes);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



