// src/App.jsx
import React from 'react';
import FoodShapeMatcher from './components/FoodShapeMatcher';

const App = () => {
    return (
        <div style={{ padding: '400px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Food Shape Matcher</h1>
            <FoodShapeMatcher />
        </div>
    );
};

export default App;