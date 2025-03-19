import React, { useState, useEffect } from 'react';

const AddEntity = () => {
    const [entityName, setEntityName] = useState('');
    const [description, setDescription] = useState(''); // State to handle description
    const [entities, setEntities] = useState([]);

    // Function to fetch entities from the backend
    const fetchEntities = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/entities');
            const data = await response.json();
            setEntities(data); // Set the entities in state
        } catch (error) {
            console.error('Error fetching entities:', error);
        }
    };

    // Function to handle form submission (add new entity)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!entityName || !description) return; // Ensure both name and description are provided

        try {
            // Send the new entity to the server
            const response = await fetch('http://localhost:4000/api/entities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: entityName, description: description }), // Send both name and description
            });

            if (response.ok) {
                console.log('Entity added successfully');
                setEntityName(''); // Clear the input field for name
                setDescription(''); // Clear the input field for description
                fetchEntities(); // Refresh the list of entities
            } else {
                console.error('Error adding entity');
            }
        } catch (error) {
            console.error('Error submitting entity:', error);
        }
    };

    // Fetch entities when the component mounts
    useEffect(() => {
        fetchEntities();
    }, []);

    return (
        <div>
            <h2>Add New Entity</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder="Enter entity name"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                />
                <button type="submit">Add Entity</button>
            </form>
            <h3>Entities List</h3>
            <ul>
                {entities.map((entity, index) => (
                    <li key={index}>
                        <strong>{entity.name}</strong>: {entity.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddEntity;
