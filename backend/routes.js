const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Entity = require('./models/entity'); // Adjust the path as necessary

// Validation schema
const entitySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[a-zA-Z0-9\s]+$/)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than 50 characters',
            'string.pattern.base': 'Name can only contain letters, numbers, and spaces',
        }),

    description: Joi.string()
        .trim()
        .min(10)
        .max(200)
        .required()
        .messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description must be less than 200 characters',
        }),
});

// Validation middleware
const validateEntity = (req, res, next) => {
    const { error } = entitySchema.validate(req.body, { abortEarly: false });
    if (error) {
        console.error('Validation errors:', error.details);
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((err) => ({
                field: err.context.key,
                message: err.message,
            })),
        });
    }
    next();
};

// Routes

// Create a new entity (C)
router.post('/entities', validateEntity, async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!created_by) {
            return res.status(400).json({ message: 'Created by field is required' });
        }

        const newEntity = new Entity({ name, description });
        await newEntity.save();
        return res.status(201).json({ message: 'Entity created successfully', entity: newEntity });
    } catch (error) {
        console.error('Error adding entity:', error);
        return res.status(500).json({ message: 'Error adding entity' });
    }
});

router.get('/entities/by-user/:user', async (req, res) => {
    const { user } = req.params;

    try {
        const entities = await Entity.find({ created_by: user });
        return res.status(200).json(entities);
    } catch (error) {
        console.error('Error fetching entities by user:', error);
        return res.status(500).json({ message: 'Error fetching entities' });
    }
});
router.get('/entities/filter/shape', async (req, res) => {
    try {
        const entities = await Entity.find({ type: 'Shape' }); // Adjust filter condition
        res.status(200).json(entities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Shape entities' });
    }
});

router.get('/entities/filter/suggestions', async (req, res) => {
    try {
        const entities = await Entity.find({ type: 'Suggestions' }); // Adjust filter condition
        res.status(200).json(entities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Suggestions entities' });
    }
});



// Read all entities (R)
router.get('/entities', async (req, res) => {
    try {
        const entities = await Entity.find();
        return res.status(200).json(entities);
    } catch (error) {
        console.error('Error fetching entities:', error);
        return res.status(500).json({ message: 'Error fetching entities' });
    }
});

// Read a single entity by ID (R)
router.get('/entities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const entity = await Entity.findById(id);

        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        return res.status(200).json(entity);
    } catch (error) {
        console.error('Error fetching entity:', error);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid entity ID' });
        }

        return res.status(500).json({ message: 'Error fetching entity' });
    }
});

// Update an entity by ID (U)
router.put('/entities/:id', validateEntity, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedEntity = await Entity.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedEntity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        return res.status(200).json({ message: 'Entity updated successfully', entity: updatedEntity });
    } catch (error) {
        console.error('Error updating entity:', error);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid entity ID' });
        }

        return res.status(500).json({ message: 'Error updating entity' });
    }
});

// Delete an entity by ID (D)
router.delete('/entities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntity = await Entity.findByIdAndDelete(id);

        if (!deletedEntity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        return res.status(200).json({ message: 'Entity deleted successfully' });
    } catch (error) {
        console.error('Error deleting entity:', error);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid entity ID' });
        }

        return res.status(500).json({ message: 'Error deleting entity' });
    }
});

module.exports = router;
