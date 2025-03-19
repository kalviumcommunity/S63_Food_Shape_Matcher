require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import connectDB
const bodyParser = require('body-parser');
// const shapeRoutes = require('./routes');
const routes = require('./routes'); 
// const Entity = require('./models/entity'); // Import the Entity model
const app = express();

app.use(bodyParser.json());
// app.use('/api', shapeRoutes);
app.use(express.json());
app.use(cors());
app.use('/api',routes);
// Connect to MongoDB Atlas
connectDB();
let entities = [];
// // Food suggestions based on shape
// const foodSuggestions = {
//     circle: [
//         { name: 'Pizza', description: 'Perfect for your round shape cravings!' },
//         { name: 'Cookies', description: 'Sweet circles of joy!' },
//         { name: 'Pancakes', description: 'Fluffy circles to start your day!' },
//         { name: 'Donuts', description: 'A hole lot of fun!' },
//         { name: 'Bagels', description: 'The circle that’s always a hit!' },
//     ],
//     triangle: [
//         { name: 'Samosas', description: 'The triangle that makes everything better!' },
//         { name: 'Nachos', description: 'Triangles of cheesy goodness!' },
//         { name: 'Pizza Slices', description: 'Triangle-shaped happiness!' },
//         { name: 'Sandwiches', description: 'Triangular delights for your lunch!' },
//     ],
//     square: [
//         { name: 'Brownies', description: 'Perfect squares of chocolate bliss!' },
//         { name: 'Toast', description: 'Square slices to start your day!' },
//         { name: 'Sandwiches', description: 'Square meals for square deals!' },
//         { name: 'Crackers', description: 'Crunchy squares for snacking!' },
//     ],
//     star: [
//         { name: 'Star-shaped Cookies', description: 'Baking stars in your kitchen!' },
//         { name: 'Cupcakes', description: 'Stars of the dessert world!' },
//         { name: 'Fruit Slices', description: 'Star-shaped fruits for a healthy treat!' },
//     ],
// };



// // API to get all entities
// app.get('/api/entities', async (req, res) => {
//     try {
//         const entities = await Entity.find();
//         res.json(entities);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching entities' });
//     }
// });

// // API to add a new entity
// // API to add a new entity
// app.post('/api/entities', async (req, res) => {
//     // Destructure the name from the request body
//     const { name } = req.body;

//     // Check if the name is provided
//     if (!name) {
//         return res.status(400).json({ message: 'Entity name is required' });
//     }

//     // Create a new entity instance
//     const newEntity = new Entity({ name });

//     try {
//         // Save the new entity to the database
//         await newEntity.save();
//         // Respond with the created entity and a 201 status code
//         return res.status(201).json(newEntity);
//     } catch (error) {
//         // Handle any errors that occur during the save operation
//         console.error('Error adding entity:', error);
//         return res.status(500).json({ message: 'Error adding entity' });
//     }
// });


// // // Endpoint to get food suggestions based on shape
// // app.post('/api/suggest', (req, res) => {
// //     const { shape } = req.body;

// //     // Validate input
// //     if (!shape) {
// //         return res.status(400).json({ error: 'Shape is required' });
// //     }

// //     // Get suggestions based on the shape
// //     const suggestions = foodSuggestions[shape.toLowerCase()] || [];
// //     res.json({ suggestions });
// // });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));