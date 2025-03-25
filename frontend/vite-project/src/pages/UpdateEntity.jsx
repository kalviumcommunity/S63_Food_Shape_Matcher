import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEntity = () => {
    const { id } = useParams(); // Extract ID from URL params
    const [entity, setEntity] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchEntityDetails(); // Fetch entity details if ID is valid
        } else {
            setError('Error: ID is undefined');
            setLoading(false);
        }
    }, [id]);

    const fetchEntityDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:4000/api/entities/${id}`);
            setEntity(response.data); // Set fetched data to the state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching entity details:', error);
            setError('Failed to load entity details. Please try again.');
            setLoading(false);
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
            navigate('/manage-entity', { 
                state: { message: response.data.message || 'Entity updated successfully' } 
            });
        } 
        catch (error) {
            console.error('Error updating entity:', error);
            setError('Failed to update entity. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Update Entity</h1>
            
            {error && (
                <div className="error-message">{error}</div>
            )}
            
            {loading ? (
                <div className="text-center">Loading entity details...</div>
            ) : id && !error ? (
                <form onSubmit={updateEntity} className="mx-auto">
                    <div className="mb-3">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={entity.name}
                            onChange={handleChange}
                            required
                            className="mb-2"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={entity.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="mb-2"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn-edit">Update Entity</button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/manage-entity')}
                            className="btn-delete ml-2"
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-center">Error: Invalid entity ID.</p>
            )}
        </div>
    );
};

export default UpdateEntity;
