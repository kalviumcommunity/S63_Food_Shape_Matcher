import { useState, useEffect } from 'react';
import axios from 'axios';

const AddEntity = () => {
    const [entityName, setEntityName] = useState('');
    const [description, setDescription] = useState('');
    const [entities, setEntities] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState('');

    // Function to fetch entities from the backend
    const fetchEntities = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/entities');
            setEntities(response.data);
        } catch (error) {
            console.error('Error fetching entities:', error);
        }
    };

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
            if (response.data.length > 0) {
                setSelectedUser(response.data[0]._id); // Select the first user by default
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to handle form submission (add new entity)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!entityName || !description) {
            setError('Name and description are required');
            return;
        }

        if (!selectedUser) {
            setError('Please select a user');
            return;
        }

        try {
            // Send the new entity to the server
            const response = await axios.post('http://localhost:4000/api/entities', {
                name: entityName,
                description: description,
                created_by: selectedUser
            });

            if (response.status === 201) {
                console.log('Entity added successfully');
                setEntityName('');
                setDescription('');
                fetchEntities();
            } else {
                setError('Error adding entity');
            }
        } catch (error) {
            console.error('Error submitting entity:', error);
            setError(error.response?.data?.message || 'Error submitting entity');
        }
    };

    // Fetch entities and users when the component mounts
    useEffect(() => {
        fetchEntities();
        fetchUsers();
    }, []);

    return (
        <div className="container">
            <h2 className="text-center mb-3">Add New Entity</h2>
            {error && <div className="error-message">{error}</div>}
            
            <div className="text-center mb-4">
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className="mb-3">
                        <label htmlFor="entity-name">Entity Name:</label>
                        <input
                            id="entity-name"
                            type="text"
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
                            placeholder="Enter entity name"
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="entity-description">Description:</label>
                        <textarea
                            id="entity-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="user-select">Created By:</label>
                        <select
                            id="user-select"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select a user</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.displayName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <button type="submit">Add Entity</button>
                </form>
            </div>
            
            <h3 className="text-center mb-3">Entities List</h3>
            {entities.length === 0 ? (
                <p className="text-center">No entities added yet. Create your first one above!</p>
            ) : (
                <ul className="entity-list">
                    {entities.map((entity) => (
                        <li key={entity._id}>
                            <strong>{entity.name}</strong>: {entity.description}
                            <div>
                                <small>
                                    Created by: {
                                        entity.created_by && typeof entity.created_by === 'object'
                                            ? entity.created_by.displayName
                                            : entity.created_by
                                    }
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddEntity;
