import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageEntity = () => {
    const [entities, setEntities] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(() => {
        fetchEntities();
    }, [selectedFilter]);

    const fetchEntities = async () => {
        try {
            const endpoint =
                selectedFilter === 'Shape'
                    ? 'http://localhost:4000/api/entities/filter/shape'
                    : selectedFilter === 'Suggestions'
                    ? 'http://localhost:4000/api/entities/filter/suggestions'
                    : 'http://localhost:4000/api/entities';

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
    };

    return (
        <div>
            <h1>Manage Entities</h1>

            {/* Dropdown to filter entities by Shape or Suggestions */}
            <div>
                <label htmlFor="filter-dropdown">Filter by:</label>
                <select id="filter-dropdown" value={selectedFilter} onChange={handleFilterChange}>
                    <option value="">All Entities</option>
                    <option value="Shape">Shape</option>
                    <option value="Suggestions">Suggestions</option>
                </select>
            </div>

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
                            <td>{entity.created_by}</td>
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
