// src/components/FoodShapeMatcher.jsx
import React, { useState } from 'react';

const foodSuggestions = {
    circle: [
        { name: 'Pizza', description: 'Perfect for your round shape cravings!' },
        { name: 'Cookies', description: 'Sweet circles of joy!' },
        { name: 'Pancakes', description: 'Fluffy circles to start your day!' },
        { name: 'Donuts', description: 'A hole lot of fun!' },
        { name: 'Bagels', description: 'The circle that’s always a hit!' },
    ],
    triangle: [
        { name: 'Samosas', description: 'The triangle that makes everything better!' },
        { name: 'Nachos', description: 'Triangles of cheesy goodness!' },
        { name: 'Pizza Slices', description: 'Triangle-shaped happiness!' },
        { name: 'Sandwiches', description: 'Triangular delights for your lunch!' },
    ],
    square: [
        { name: 'Brownies', description: 'Perfect squares of chocolate bliss!' },
        { name: 'Toast', description: 'Square slices to start your day!' },
        { name: 'Sandwiches', description: 'Square meals for square deals!' },
        { name: 'Crackers', description: 'Crunchy squares for snacking!' },
    ],
    star: [
        { name: 'Star-shaped Cookies', description: 'Baking stars in your kitchen!' },
        { name: 'Cupcakes', description: 'Stars of the dessert world!' },
        { name: 'Fruit Slices', description: 'Star-shaped fruits for a healthy treat!' },
    ],
};

const FoodShapeMatcher = () => {
    const [shape, setShape] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        setShape(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const lowerCaseShape = shape.toLowerCase();
        setSuggestions(foodSuggestions[lowerCaseShape] || []);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    value={shape}
                    onChange={handleInputChange}
                    placeholder="Enter a shape (e.g., circle, triangle)"
                    style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '10px 20px' }}>Get Food Suggestions</button>
            </form>
            <div>
                {suggestions.length > 0 && (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {suggestions.map((food, index) => (
                            <li key={index} style={{ margin: '10px 0' }}>
                                <strong>{food.name}</strong>: {food.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FoodShapeMatcher;