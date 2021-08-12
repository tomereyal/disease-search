const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const diseaseRoutes = require("./routes/disease");
const markRoutes = require("./routes/mark");
const app = express();
const PORT = process.env.PORT;
const connect = mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false); // To get rid of the warnings in the console

app.use(cors());
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//to parse json data from clients post requests of type application/json
app.use(cookieParser());

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use("/api/disease", diseaseRoutes);
app.use("/api/mark", markRoutes);
app.listen(PORT, () => {
  console.log(`Server is up at port:`, PORT);
});
