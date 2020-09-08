const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
const port = 3000;

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/tmp/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// const upload = multer({ storage: storage });

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
