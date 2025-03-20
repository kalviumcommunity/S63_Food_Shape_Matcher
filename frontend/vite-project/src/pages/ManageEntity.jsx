import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageEntity = () => {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetchEntities();
    }, []);

    const fetchEntities = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/entities');
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

    return (
        <div>
            <h1>Manage Entities</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        <tr key={entity._id}>
                            <td>{entity.name}</td>
                            <td>{entity.description}</td>
                            <td>
                                <Link to={`/update-entity/${entity._id}`}>Edit</Link>
                                <button onClick={() => deleteEntity(entity._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageEntity;
