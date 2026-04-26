import React, { useState, useEffect } from "react";

function Cart({ onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setCartItems(data);

        // Safely calculate total
        const total = data.reduce(
          (sum, item) => sum + (item.productId?.price ? Number(item.productId.price) : 0),
          0
        );
        setTotalPrice(total);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);

  // Calculate total dynamically
  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + (item.productId?.price ? Number(item.productId.price) : 0),
      0
    );
    setTotalPrice(total);
  };

  // Remove item
  const handleRemove = async (productId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      alert(data.message);

      const updatedCart = cartItems.filter(item => item.productId._id !== productId);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Server error while removing item.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.cartBox}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={styles.heading}>My Cart</h2>

        {cartItems.length === 0 ? (
          <p style={styles.emptyMsg}>Your cart is empty.</p>
        ) : (
          <>
            <div style={styles.cartContainer}>
              {cartItems.map((item) => (
                <div key={item.productId._id} style={styles.card}>
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    style={styles.image}
                  />
                  <div style={styles.info}>
                    <h3 style={styles.name}>{item.productId.name}</h3>
                    <p style={styles.price}>₹{item.productId.price}</p>
                    <button
                      style={styles.removeBtn}
                      onClick={() => handleRemove(item.productId._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h3 style={styles.total}>Total: ₹{totalPrice}</h3>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  cartBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  emptyMsg: {
    fontSize: "18px",
    color: "#555",
  },
  cartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    width: "90%",
    maxWidth: "600px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "20px",
  },
  info: {
    flex: 1,
    textAlign: "left",
  },
  name: {
    margin: "0 0 5px 0",
  },
  price: {
    margin: "0 0 10px 0",
    fontWeight: "600",
  },
  removeBtn: {
    padding: "6px 12px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  total: {
    marginTop: "25px",
    fontSize: "22px",
    fontWeight: "bold",
  },
};

export default Cart;
