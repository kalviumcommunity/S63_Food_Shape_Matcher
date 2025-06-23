import { useState } from 'react';
import axios from 'axios';

const ShapeFoodSuggest = () => {
  const [shape, setShape] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // Track past shape inputs and suggestions

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuggestions([]);
    setLoading(true);
    try {
      const res = await axios.get('/api/food-suggestions', {
        params: { shape }
      });
      setSuggestions(res.data.suggestions);
      // Add to history
      setHistory(prev => [
        { shape, suggestions: res.data.suggestions },
        ...prev
      ]);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Try again!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shape-food-suggest-container">
      <div className="emoji-banner" style={{ fontSize: '2.2rem', marginBottom: '0.5rem', lineHeight: 1, letterSpacing: '0.2rem' }}>
        🍕🍩🍔🍟🍉🍪🥨🍰🥞🍦
      </div>
      <h2>Find Foods by <span style={{ color: '#ff6b6b', textShadow: '1px 1px 0 #ffe66d' }}>Shape</span></h2>
      <form onSubmit={handleSubmit} className="shape-form">
        <input
          type="text"
          placeholder="Enter a shape (e.g. circle, triangle)"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="suggestions-list">
        {suggestions.map((item, idx) => (
          <div className="suggestion-card" key={idx}>
            <img src={item.image} alt={item.heading} className="suggestion-img" />
            <h3>{item.heading}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {/* History Section */}
      {history.length > 0 && (
        <div className="history-section">
          <h3>History: Past Shape Inputs & Suggestions</h3>
          <ul className="history-list">
            {history.map((entry, i) => (
              <li key={i} className="history-entry">
                <strong>Shape:</strong> {entry.shape}
                <div className="history-suggestions">
                  {entry.suggestions.map((item, idx) => (
                    <span key={idx} className="history-suggestion">
                      {item.heading}
                      {idx < entry.suggestions.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShapeFoodSuggest; 