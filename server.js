require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas


app.get("/", (req, res) => {
  res.send("Welcome to the Food Shape Matcher");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));