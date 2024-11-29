import { useState } from "react";
import "./App.css";

function App() {
  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
  const [mainImg, setMainImg] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = () => {
    setCart([{ image: mainImg, quantity }]);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setMainImg(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setMainImg(images[prevIndex]);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Sneakers</div>
        <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
        ></button>
        <ul className={`menu ${menuOpen ? "show" : ""}`}>
          <li>Collections</li>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
          🛒
        </div>
      </nav>

      <div className="container">
        <div className="left">
          <img
            src={`/assets/${mainImg}`}
            alt="Main"
            className="main-image"
            onClick={() => setShow(true)}
          />

          <div className="thumbnails">
            {images.map((el, index) => (
              <img
                key={el}
                src={`/assets/${el}`}
                alt={`Thumbnail ${el}`}
                className={`thumbnail ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => {
                  setMainImg(el);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>

        <div className="right">
          <h2>Sneaker Company</h2>
          <h1>Fall Limited Edition Sneakers</h1>
          <p>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="pricing">
            <div className="current-price">$125.00</div>
            <div className="discount">50%</div>
            <div className="original-price">$250.00</div>
          </div>
          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {cartOpen && (
        <div className="cart-modal show">
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            &times;
          </button>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="item">
                <div className="item-details">
                  <img src={`/assets/${item.image}`} alt="Cart Item" />
                  <div>
                    <div className="item-name">Sneaker</div>
                    <div className="item-price">${125 * item.quantity}</div>
                  </div>
                </div>
                <div className="item-quantity">Quantity: {item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="total">Total: ${125 * quantity}</div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}

      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-prev" onClick={prevImage}>
              &lt;
            </button>
            <img
              src={`/assets/${mainImg}`}
              alt="Modal Main"
              className="modal-main-image"
            />
            <button className="modal-next" onClick={nextImage}>
              &gt;
            </button>
            <button className="modal-close" onClick={() => setShow(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
