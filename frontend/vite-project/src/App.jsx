// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddEntity, LandingPage} from './routes'; // Ensure these components are correctly imported
import Navbar from './components/Navbar.jsx'; // Import the Navbar component
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar /> {/* Render the Navbar here */}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/add-entity' element={<AddEntity />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;