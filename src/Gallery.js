import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Gallery() {
  const [products, setProducts] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const productsWithId = data.map((product) => ({
          ...product,
          id: product._id,
        }));
        setProducts(productsWithId);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleToggleDetails = (id) => {
    setVisibleDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Product added to cart.");
      } else {
        alert(data.message || "Could not add to cart. Try again.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Server error while adding to cart. Try again later.");
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNext = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Animated gallery section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage} // triggers reanimation when page changes
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={styles.galleryContainer}
            >
              {currentProducts.map((product) => (
                <div key={product.id} style={styles.card}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>

                  <button
                    style={styles.addToCartBtn}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    + Add to Cart
                  </button>

                  <button
                    style={styles.detailBtn}
                    onClick={() => handleToggleDetails(product.id)}
                  >
                    {visibleDetails[product.id] ? "Hide Details" : "View Details"}
                  </button>

                  {visibleDetails[product.id] && (
                    <p style={styles.description}>{product.description}</p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

      {/* Modern Pagination Controls */}
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.pageButton,
            ...(currentPage === 1 ? styles.disabledButton : {}),
          }}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ◀ Previous
        </button>

        <span style={styles.pageInfo}>
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </span>

        <button
          style={{
            ...styles.pageButton,
            ...(currentPage === Math.ceil(products.length / productsPerPage)
              ? styles.disabledButton
              : {}),
          }}
          onClick={handleNext}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: "center",
    padding: "20px",
  },
  galleryContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    minHeight: "400px",
  },
  card: {
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  description: {
    marginTop: "10px",
    color: "#333",
    fontSize: "14px",
  },
  addToCartBtn: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#000",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  detailBtn: {
    display: "block",
    width: "100%",
    margin: "5px 0",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #555",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  pagination: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  pageInfo: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  pageButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#111",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  disabledButton: {
    backgroundColor: "#777",
    cursor: "not-allowed",
    boxShadow: "none",
    opacity: 0.6,
  },
};

export default Gallery;
