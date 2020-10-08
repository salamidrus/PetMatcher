const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// env variables
require("dotenv").config();

const app = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// db config
const mongoURI = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// routes
const userRoutes = require("./routes/user");
const errorHandler = require("./middlewares/errorhandler");

app.use("/api/v1/user", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening to ${PORT}`));
