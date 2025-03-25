import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to the Food Shape Matcher 🍕</h1>
      
      <p>
        &quot;Food Shape Matcher&quot; is a fun web app where users enter a shape, and the app suggests 
        food items resembling that shape.
      </p>
      
      <div className="feature-list mb-4">
        <h3>For example:</h3>
        <ul>
          <li><strong>Circle:</strong> Pizza, donuts, cookies</li>
          <li><strong>Triangle:</strong> Nachos, samosas, pie slices</li>
          <li><strong>Square:</strong> Brownies, sandwiches, toast</li>
          <li><strong>Star:</strong> Star-shaped cookies, cupcakes</li>
        </ul>
      </div>
      
      <div className="feature-list mb-4">
        <h3>Key Features:</h3>
        <ul>
          <li><strong>User Input:</strong> Text box for entering shapes (circle, triangle, etc.)</li>
          <li><strong>Food Suggestions:</strong> Lists matching food items with quirky descriptions</li>
          <li><strong>Shape Gallery:</strong> Visual gallery of suggested foods with images</li>
          <li><strong>History:</strong> Track past shape inputs and food suggestions 🚀</li>
        </ul>
      </div>
      
      <Link to="/add-entity">
        <button>Create your own!</button>
      </Link>
    </div>
  );
};

export default LandingPage;