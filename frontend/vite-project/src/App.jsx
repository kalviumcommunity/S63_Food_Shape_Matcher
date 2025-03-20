// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddEntity, LandingPage, ManageEntity, UpdateEntity} from './routes'; // Ensure these components are correctly imported
import Navbar from './components/Navbar.jsx'; // Import the Navbar component
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar /> {/* Render the Navbar here */}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/add-entity' element={<AddEntity />} />
                <Route path='/manage-entity' element={<ManageEntity />} />
                <Route path='/update-entity/:id' element={<UpdateEntity />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;