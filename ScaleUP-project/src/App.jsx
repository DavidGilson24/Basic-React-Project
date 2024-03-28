import React, { useState } from 'react';
import './App.css';
import top1 from '../src/assets/img/top1.jpg';
import bottom1 from '../src/assets/img/bottom1.jpg';
import shoes1 from '../src/assets/img/shoes1.jpg';
import logo from '../src/assets/img/logo.png';
import CartModal from './CartModal';

const products = [
  { id: 1, name: "EH - Cargo pants", category: "Bottoms", image: bottom1 },
  { id: 2, name: "EH -  Windbreaker", category: "Tops", image: top1 },
  { id: 3, name: "EH - Leather Shoes WM", category: "Shoes", image: shoes1 },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find((item) => item.id === productToAdd.id);
  
      if (isProductInCart) {
        return prevItems.map((item) => 
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find((item) => item.id === productId);
  
      if (isProductInCart && isProductInCart.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== productId);
      }
    });
  };
  

  const toggleCart = () => {
    setIsCartVisible(prevState => !prevState);
  };

  const closeCart = () => {
    setIsCartVisible(false);
  };

  const filteredProducts = products.filter(
    (product) => activeCategory === 'All' || product.category === activeCategory
  );

  return (
    <>
      <header className="header">
        <img src={logo} alt="Event Horizon Logo" className="logo" />
        <h1>Event Horizon Clothing</h1>
        <button onClick={toggleCart} className="cart-button">Cart</button>
      </header>
      <div className="category-filters">
        <button onClick={() => setActiveCategory('All')}>All</button>
        <button onClick={() => setActiveCategory('Bottoms')}>Bottoms</button>
        <button onClick={() => setActiveCategory('Tops')}>Tops</button>
        <button onClick={() => setActiveCategory('Shoes')}>Shoes</button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      {isCartVisible && (
        <CartModal 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          onClose={closeCart} 
        />
      )}
    </>
  );
}

export default App;

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

