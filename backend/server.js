require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./connectDB"); // Import connectDB
const bodyParser = require('body-parser');
// const shapeRoutes = require('./routes');
const routes = require('./routes'); 
// const Entity = require('./models/entity'); // Import the Entity model
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use('/api',routes);
// Connect to MongoDB Atlas
connectDB();
let entities = [];


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));