const express = require('express');
const router = express.Router();
const Entity = require('./models/entity'); // Adjust the path as necessary

// Create a new entity (C)
router.post('/entities', async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validation
        if (!name || !description) {
            return res.status(400).json({ message: 'Both name and description are required' });
        }

        const newEntity = new Entity({ name, description });

        // Save the new entity to the database
        await newEntity.save();
        return res.status(201).json({ message: 'Entity created successfully', entity: newEntity });
    } catch (error) {
        console.error('Error adding entity:', error);
        return res.status(500).json({ message: 'Error adding entity' });
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

        // Check if the error is due to an invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid entity ID' });
        }

        return res.status(500).json({ message: 'Error fetching entity' });
    }
});

// Update an entity by ID (U)
router.put('/entities/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      
    
        // Validation
        if (!name || !description) {
            return res.status(400).json({ message: 'Both name and description are required' });
        }

        const updatedEntity = await Entity.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true } // Return updated document and validate schema
        );

        if (!updatedEntity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        return res.status(200).json({ message: 'Entity updated successfully', entity: updatedEntity });
    } catch (error) {
        console.error('Error updating entity:', error);

        // Check if the error is due to an invalid ObjectId
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
        return res.status(500).json({ message: 'Error deleting entity' });
    }
});

module.exports = router;
