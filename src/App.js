import React, { useState } from "react";
import "./App.css";
import "./Login.css";
import logo from "./images/logo.jpeg";
import Login from "./Login";
import Register from "./Register";
import Gallery from "./Gallery";
import Cart from "./Cart";
import Home from "./Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Handlers
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowCart(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowCart(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setShowCart(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowCart(false);
    localStorage.removeItem("jwtToken");
  };

  const handleCartClick = () => {
    setShowCart((prev) => !prev); // toggle cart on/off
  };

  return (
    <div className="App">
      <Navbar
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogoutClick={handleLogout}
        onCartClick={handleCartClick}
        isLoggedIn={isLoggedIn}
      />

      {/* Main Content */}
      {isLoggedIn ? (
        <>
          <Homes />
          <Shop />
          <About />
          <Contact />
          {showCart && <Cart onClose={() => setShowCart(false)} />} {/* 👈 overlay cart */}
        </>
      ) : showLoginForm ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : showRegisterForm ? (
        <Register onRegisterSuccess={handleLoginClick} />
      ) : (
        <div className="landing-message">
          <h2>Welcome to DripShip!</h2>
          <p>Click Login or Register to continue.</p>
        </div>
      )}
    </div>
  );
}

function Navbar({ onLoginClick, onLogoutClick, onRegisterClick, onCartClick, isLoggedIn }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="DripShip Logo" className="navbar-logo" />
        <span className="navbar-title">DripShip</span>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("shop")}>Shop</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>

          {!isLoggedIn && <li onClick={onRegisterClick}>Register</li>}

          {isLoggedIn && <li onClick={onCartClick}>My Cart</li>}

          {isLoggedIn ? (
            <li onClick={onLogoutClick}>Logout</li>
          ) : (
            <li onClick={onLoginClick}>Login</li>
          )}
        </ul>
      </div>
    </nav>
  );
}

// --- Sections ---
function Homes() {
  return (
    <section id="home" className="section">
      <Home/>
    </section>
  );
}

function Shop() {
  return (
    <section id="shop" className="section">
      <h2>Shop Section</h2>
      <p>Explore our exclusive dropshipping products.</p>
      <Gallery />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <h2>About Us</h2>
      <p>Learn more about DripShip's mission and team.</p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Contact Us</h2>
      <p>Feel free to reach out through our email or social media.</p>
    </section>
  );
}

export default App;
