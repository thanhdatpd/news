const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const port = 3000;


const indexRouter = require('./routers/index');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static("public"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/posts', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
