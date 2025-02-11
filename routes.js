const express = require('express');
const router = express.Router();

// Sample data structure to hold shapes and food suggestions
let foodShapes = [
    { id: 1, shape: 'circle', foods: ['Pizza', 'Cookies', 'Pancakes', 'Donuts', 'Bagels'] },
    { id: 2, shape: 'triangle', foods: ['Slices of Pizza', 'Samosas', 'Nachos', 'Sandwiches'] },
    { id: 3, shape: 'square', foods: ['Brownies', 'Toast', 'Sandwiches', 'Crackers'] },
    { id: 4, shape: 'star', foods: ['Star-shaped Cookies', 'Cupcakes', 'Fruit Slices'] }
];

// CREATE: Add a new shape and food suggestion
router.post('/shapes', (req, res) => {
    const { shape, foods } = req.body;
    const newShape = { id: foodShapes.length + 1, shape, foods };
    foodShapes.push(newShape);
    res.status(201).json(newShape);
});

// READ: Get all shapes and food suggestions
router.get('/shapes', (req, res) => {
    res.json(foodShapes);
});

// READ: Get a specific shape by ID
router.get('/shapes/:id', (req, res) => {
    const shape = foodShapes.find(s => s.id === parseInt(req.params.id));
    if (!shape) return res.status(404).send('Shape not found.');
    res.json(shape);
});

// UPDATE: Update a shape and its food suggestions
router.put('/shapes/:id', (req, res) => {
    const shape = foodShapes.find(s => s.id === parseInt(req.params.id));
    if (!shape) return res.status(404).send('Shape not found.');

    const { shape: newShape, foods } = req.body;
    shape.shape = newShape;
    shape.foods = foods;
    res.json(shape);
});

// DELETE: Remove a shape and its food suggestions
router.delete('/shapes/:id', (req, res) => {
    const shapeIndex = foodShapes.findIndex(s => s.id === parseInt(req.params.id));
    if (shapeIndex === -1) return res.status(404).send('Shape not found.');

    const deletedShape = foodShapes.splice(shapeIndex, 1);
    res.json(deletedShape);
});

module.exports = router;