// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, ShapeFoodSuggest } from './routes';
import Navbar from './components/Navbar.jsx';
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/shape-food-suggest' element={<ShapeFoodSuggest />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;