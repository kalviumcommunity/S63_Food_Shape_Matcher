import React from "react";

const landingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to the Food Shape Matcher 🙇‍♂️</h1>
      <p> Food Shape Matcher" is a fun web app where users enter a shape, and the app suggests food items resembling that shape. 
        For example:
        Circle: Pizza, donuts, cookies.
        Triangle: Nachos, samosas, pie slices.
        Square: Brownies, sandwiches, toast.
        Star: Star-shaped cookies, cupcakes.
        Key Features:
        User Input: Text box for entering shapes (circle, triangle, etc.).
        Food Suggestions: Lists matching food items with quirky descriptions (e.g., "Samosas – the triangle that makes everything better!").
        Shape Gallery: Visual gallery of suggested foods with images.
History: 
Track past shape inputs and food suggestions. 🚀</p>
      <button>Create your own!</button>
    </div>
  );
};

export default landingPage;