import express from "express";
import db from './config/database/db';
import controller from './controller/controller'

const app = express();

// set view engine
app.set('view engine', 'ejs');

// handle all static files
app.use(express.static('./'));

// run server
let PORT = 3000;
app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening to ' + PORT);
    }
})
// connect database
db();

// let controller handle request
controller(app);
