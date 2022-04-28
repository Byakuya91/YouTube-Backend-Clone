// imports for backend
require("dotenv").config();
const connectDB = require("./db/db");
const express = require("express");
const cors = require("cors");
const app = express();
// router exports
const comments = require("./routes/comments");

// Setting up server connection
connectDB();

// MiddleWare setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Base paths for routes
app.use("/api/comments", comments);

//  PORT = 3007 from .env file

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running. Listening on PORT: ${PORT}`);
});
