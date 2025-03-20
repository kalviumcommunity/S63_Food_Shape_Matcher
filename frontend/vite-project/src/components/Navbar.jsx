// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    return (
        <nav>
            <ul>
                <h1>FOOD SHAPE MATCHER</h1>
                <ul><Link to="/">Home</Link></ul>
                <ul><Link to="/add-entity">Add Entity</Link></ul>
                <ul><Link to="/manage-entity">Manage Entity</Link></ul>
                <ul><Link to="/update-entity">Update Entity</Link></ul>
            </ul>
        </nav>
    );
};

export default Navbar;