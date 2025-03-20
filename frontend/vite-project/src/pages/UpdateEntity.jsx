import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEntity = () => {
    const { id } = useParams(); // Extract ID from URL params
    const [entity, setEntity] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchEntityDetails(); // Fetch entity details if ID is valid
        } else {
            console.error('Error: ID is undefined');
        }
    }, [id]);

    const fetchEntityDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/entities/${id}`);
            setEntity(response.data); // Set fetched data to the state
        } catch (error) {
            console.error('Error fetching entity details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntity({ ...entity, [name]: value });
    };

    const updateEntity = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/entities/${id}`, entity);
            alert(response.data.message || 'Entity updated successfully');
            navigate('/manage-entity'); // Navigate back to manage page
        } 
        catch (error) {
            console.error('Error updating entity:', error);
            alert('Failed to update entity. Please try again.');
        }
    };

    return (
        <div>
            <h1>Update Entity</h1>
            {id ? (
                <form onSubmit={updateEntity}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={entity.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={entity.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Error: Invalid entity ID.</p>
            )}
        </div>
    );
};

export default UpdateEntity;
