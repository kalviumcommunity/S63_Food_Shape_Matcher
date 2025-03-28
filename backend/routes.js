const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Entity = require('./models/entity'); // Adjust the path as necessary
const User = require('./models/user'); // Import User model
const { protect, generateToken } = require('./middleware/auth');

// Authentication endpoints
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, displayName } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({ 
                message: 'User already exists',
                field: userExists.email === email ? 'email' : 'username'
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            displayName
        });

        if (user) {
            // Generate token
            const token = generateToken(user._id);

            // Set token in cookie
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    displayName: user.displayName
                }
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Error during registration' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user in database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                displayName: user.displayName
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Error during login' });
    }
});

router.post('/logout', (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');
        
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Error during logout' });
    }
});

// Get current user profile
router.get('/me', protect, async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({ message: 'Error fetching profile' });
    }
});

// In-memory data for users and entities (for demonstration purposes)
const inMemoryUsers = [
    { 
        _id: '1', 
        username: 'john_doe', 
        email: 'john@example.com', 
        displayName: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: '2', 
        username: 'jane_smith', 
        email: 'jane@example.com', 
        displayName: 'Jane Smith',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    { 
        _id: '3', 
        username: 'bob_johnson', 
        email: 'bob@example.com', 
        displayName: 'Bob Johnson',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const inMemoryEntities = [
    {
        _id: '101',
        name: 'Circle Shape',
        description: 'A perfect circle shape for design',
        created_by: '1', // John Doe
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '102',
        name: 'Square Design',
        description: 'A square design element for layouts',
        created_by: '2', // Jane Smith
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '103',
        name: 'Triangle Pattern',
        description: 'A triangle pattern for backgrounds',
        created_by: '1', // John Doe
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '104',
        name: 'Hexagon Grid',
        description: 'A hexagonal grid for modern designs',
        created_by: '3', // Bob Johnson
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

// Helper function to find a user by ID
const findUserById = (userId) => {
    return inMemoryUsers.find(user => user._id === userId);
};

// Helper function to populate entity with user data
const populateEntityWithUser = (entity) => {
    if (entity && entity.created_by) {
        const user = findUserById(entity.created_by);
        if (user) {
            return {
                ...entity,
                created_by: {
                    _id: user._id,
                    username: user.username,
                    displayName: user.displayName
                }
            };
        }
    }
    return entity;
};

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
    
    // created_by is now optional in the request body since it's set from the authenticated user
    created_by: Joi.string().optional()
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
router.post('/entities', protect, validateEntity, (req, res) => {
    try {
        const { name, description } = req.body;
        const created_by = req.user._id;

        // Create new entity
        const newEntity = {
            _id: Date.now().toString(),
            name,
            description,
            created_by,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        inMemoryEntities.push(newEntity);
        return res.status(201).json({ message: 'Entity created successfully', entity: newEntity });
    } catch (error) {
        console.error('Error adding entity:', error);
        return res.status(500).json({ message: 'Error adding entity' });
    }
});

// Get entities by user ID
router.get('/entities/by-user/:userId', (req, res) => {
    const { userId } = req.params;

    try {
        const entities = inMemoryEntities
            .filter(entity => entity.created_by === userId)
            .map(entity => populateEntityWithUser(entity));
        
        return res.status(200).json(entities);
    } catch (error) {
        console.error('Error fetching entities by user:', error);
        return res.status(500).json({ message: 'Error fetching entities' });
    }
});

// Get all users
router.get('/users', (req, res) => {
    try {
        return res.status(200).json(inMemoryUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Error fetching users' });
    }
});

// Seed users (for development purposes) - Not needed with in-memory data
router.post('/seed-users', (req, res) => {
    return res.status(200).json({ 
        message: 'Users already seeded in memory', 
        users: inMemoryUsers 
    });
});
router.get('/entities/filter/shape', (req, res) => {
    try {
        // For demonstration, we'll just return the first two entities
        const entities = inMemoryEntities
            .slice(0, 2)
            .map(entity => populateEntityWithUser(entity));
        
        res.status(200).json(entities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Shape entities' });
    }
});

router.get('/entities/filter/suggestions', (req, res) => {
    try {
        // For demonstration, we'll just return the last two entities
        const entities = inMemoryEntities
            .slice(2)
            .map(entity => populateEntityWithUser(entity));
        
        res.status(200).json(entities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Suggestions entities' });
    }
});



// Read all entities (R)
router.get('/entities', (req, res) => {
    try {
        const entities = inMemoryEntities.map(entity => populateEntityWithUser(entity));
        return res.status(200).json(entities);
    } catch (error) {
        console.error('Error fetching entities:', error);
        return res.status(500).json({ message: 'Error fetching entities' });
    }
});

// Read a single entity by ID (R)
router.get('/entities/:id', (req, res) => {
    const { id } = req.params;

    try {
        const entity = inMemoryEntities.find(e => e._id === id);

        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        return res.status(200).json(populateEntityWithUser(entity));
    } catch (error) {
        console.error('Error fetching entity:', error);
        return res.status(500).json({ message: 'Error fetching entity' });
    }
});

// Update an entity by ID (U)
router.put('/entities/:id', protect, validateEntity, (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user._id;

    try {
        const entityIndex = inMemoryEntities.findIndex(e => e._id === id);
        
        if (entityIndex === -1) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        // Check if user owns the entity
        if (inMemoryEntities[entityIndex].created_by !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this entity' });
        }

        // Update the entity
        inMemoryEntities[entityIndex] = {
            ...inMemoryEntities[entityIndex],
            name,
            description,
            updatedAt: new Date()
        };

        return res.status(200).json({ 
            message: 'Entity updated successfully', 
            entity: populateEntityWithUser(inMemoryEntities[entityIndex]) 
        });
    } catch (error) {
        console.error('Error updating entity:', error);
        return res.status(500).json({ message: 'Error updating entity' });
    }
});

// Delete an entity by ID (D)
router.delete('/entities/:id', protect, (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const entityIndex = inMemoryEntities.findIndex(e => e._id === id);
        
        if (entityIndex === -1) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        // Check if user owns the entity
        if (inMemoryEntities[entityIndex].created_by !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this entity' });
        }

        // Remove the entity
        const deletedEntity = inMemoryEntities.splice(entityIndex, 1)[0];

        return res.status(200).json({ 
            message: 'Entity deleted successfully',
            entity: deletedEntity
        });
    } catch (error) {
        console.error('Error deleting entity:', error);
        return res.status(500).json({ message: 'Error deleting entity' });
    }
});



module.exports = router;
