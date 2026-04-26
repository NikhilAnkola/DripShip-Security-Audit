import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* --- Hero Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.hero}
      >
        <h1 style={styles.title}>Welcome to <span style={{ color: "#007bff" }}>DripShip</span></h1>
        <p style={styles.subtitle}>
          Your favorite finds, delivered with a click.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.ctaButton}
          onClick={() =>
            document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore Products
        </motion.button>
      </motion.div>

      {/* --- Features Section --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={styles.featuresContainer}
      >
        {[
          {
            title: "Global Suppliers",
            desc: "Access high-quality products from trusted international suppliers.",
          },
          {
            title: "Easy Product Discovery",
            desc: "Browse curated listings with detailed descriptions, images, and prices.",
          },
          {
            title: "Cart & Wishlist",
            desc: "Add products to your cart or wishlist and manage them effortlessly.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            style={styles.featureCard}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Inline Styles ---
const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f9f9f9",
  },
  hero: {
    marginBottom: "60px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#444",
    maxWidth: "600px",
    margin: "0 auto 25px auto",
  },
  ctaButton: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  featuresContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    marginBottom: "60px",
  },
  featureCard: {
    backgroundColor: "#fff",
    width: "260px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  ctaSection: {
    padding: "40px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};

export default Home;
