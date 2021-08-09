const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookieParser");
const bodyParser = require("body-parser");
const logger = require("morgan")



const app = express();
const PORT = 5000;

app.listen(PORT,() => {
  console.log(`Server is up at port:`, PORT)
})