const express = require("express");
const controller = require("./controller/controller");

const app = express();

// set view engine to ejs
app.set('view engine', 'ejs');

// handle all static files
app.use(express.static('./'));

// pass req to controller
controller(app);

let curPort = 3000;
app.listen(curPort);
console.log('listening to port ', curPort);




