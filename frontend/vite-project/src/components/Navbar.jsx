// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li className="brand">
                    <h1>FOOD SHAPE MATCHER</h1>
                </li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-entity">Add Entity</Link></li>
                <li><Link to="/manage-entity">Manage Entity</Link></li>
                {/* <li><Link to="/update-entity">Update Entity</Link></li> */}
            </ul>
        </nav>
    );
};

export default Navbar;