// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const DevNoteBanner = () => (
  <div className="dev-note" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
    <div style={{ fontSize: '1.05rem', background: '#fffbe6', border: '2.5px dashed #4ecdc4', borderRadius: '18px', padding: '1.1rem 1.2rem', boxShadow: '0 2px 8px rgba(78,205,196,0.08)', margin: '1.5rem auto 0 auto', maxWidth: '900px', color: '#333', fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
      <strong style={{ fontSize: '1.15rem', color: '#ff6b6b' }}>FoodShapeMatcher: A Whimsical Start to My Coding Journey</strong>
      <br /><br />
      My first-ever project, FoodShapeMatcher, was born during a college assignment called <b>ASAP (As Silly As Possible)</b>. The idea was to craft something unique and fun: a food shape matcher that suggests foods based on shapes—triangles? Think nachos! Circles? Hello, pancakes! While the concept was playful, the process was a serious learning experience that laid the foundation for my technical journey.<br /><br />
      Building FoodShapeMatcher introduced me to the <b>MERN stack</b> (MongoDB, Express.js, React.js, Node.js), where I gained hands-on experience in full-stack web development. I designed the application&apos;s architecture, implemented algorithms to match shapes with foods, and used MongoDB for managing data. Through Express.js and Node.js, I developed a seamless backend to handle requests efficiently, while React.js enabled me to create an interactive and user-friendly interface.<br /><br />
      This project helped me strengthen my skills in API integration, database management, and front-to-backend connectivity, as well as enhance my ability to think creatively about solving user problems. More than just a playful concept, FoodShapeMatcher was my gateway to understanding the intricacies of web development, and it stands as a testament to how I turned a quirky idea into a functional, technically sound application.<br /><br />
      <span style={{ color: '#4ecdc4', fontWeight: 'bold', fontSize: '1.05rem' }}>It&apos;s a project I&apos;m proud to showcase, demonstrating not only my technical capabilities but also my innovative spirit. 🚀</span>
    </div>
  </div>
);

const Navbar = () => {
    return (
        <>
        <nav>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="brand">
                    <h1>FOOD SHAPE MATCHER</h1>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'row', gap: '2rem', marginTop: '1rem', justifyContent: 'center' }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shape-food-suggest">Shape Food Suggest</Link></li>
                </ul>
            </div>
        </nav>
        <DevNoteBanner />
        </>
    );
};

export default Navbar;