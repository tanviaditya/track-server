require("./models/user");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
const mongoUri =
  "mongodb+srv://admin:admin@cluster0.s5zzj.mongodb.net/<dbname>?retryWrites=true&w=majority";

//to connect to our mongoose instance
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//successful connection
mongoose.connection.on("connected", () => {
  console.log("Connection successfull");
});

//error
mongoose.connection.on("error", () => {
  console.log("Connection failed");
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});
app.listen(8000, () => {
  console.log("Listening on 8000 port");
});
