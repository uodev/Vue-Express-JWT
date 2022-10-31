const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser"); //cookileri parçalamak için

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI =
  "mongodb+srv://admin:123456uU@nodeauth.zndhoo6.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.send("home"));
app.use(authRoutes);
