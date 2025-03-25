import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageEntity = () => {
    const [entities, setEntities] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        fetchEntities();
        fetchUsers();
    }, [selectedFilter, selectedUser]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchEntities = async () => {
        try {
            let endpoint = 'http://localhost:4000/api/entities';
            
            if (selectedUser) {
                endpoint = `http://localhost:4000/api/entities/by-user/${selectedUser}`;
            } else if (selectedFilter === 'Shape') {
                endpoint = 'http://localhost:4000/api/entities/filter/shape';
            } else if (selectedFilter === 'Suggestions') {
                endpoint = 'http://localhost:4000/api/entities/filter/suggestions';
            }

            const response = await axios.get(endpoint);
            setEntities(response.data);
        } catch (error) {
            console.error('Error fetching entities:', error);
        }
    };

    const deleteEntity = async (id) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this entity?');
            if (!confirmDelete) return;

            const response = await axios.delete(`http://localhost:4000/api/entities/${id}`);
            alert(response.data.message || 'Entity deleted successfully');
            fetchEntities(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting entity:', error);
            alert('Failed to delete entity. Please try again.');
        }
    };

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
        setSelectedUser(''); // Reset user selection when filter changes
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        setSelectedFilter(''); // Reset filter selection when user changes
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Manage Entities</h1>

            <div className="filter-controls">
                {/* Dropdown to filter entities by Shape or Suggestions */}
                <div className="filter-control">
                    <label htmlFor="filter-dropdown">Filter by Type:</label>
                    <select 
                        id="filter-dropdown" 
                        value={selectedFilter} 
                        onChange={handleFilterChange}
                        disabled={selectedUser !== ''}
                    >
                        <option value="">All Types</option>
                        <option value="Shape">Shape</option>
                        <option value="Suggestions">Suggestions</option>
                    </select>
                </div>

                {/* Dropdown to filter entities by User */}
                <div className="filter-control">
                    <label htmlFor="user-dropdown">Filter by User:</label>
                    <select 
                        id="user-dropdown" 
                        value={selectedUser} 
                        onChange={handleUserChange}
                        disabled={selectedFilter !== ''}
                    >
                        <option value="">All Users</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.displayName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {entities.length === 0 ? (
                <div className="text-center p-4">
                    <p>No entities found. Try changing your filters or add some entities.</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entities.map((entity) => (
                            <tr key={entity._id}>
                                <td>{entity.name}</td>
                                <td>{entity.description}</td>
                                <td>
                                    {entity.created_by && typeof entity.created_by === 'object' 
                                        ? entity.created_by.displayName 
                                        : entity.created_by}
                                </td>
                                <td className="action-buttons">
                                    <Link to={`/update-entity/${entity._id}`} className="btn-edit">Edit</Link>
                                    <button 
                                        onClick={() => deleteEntity(entity._id)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageEntity;
