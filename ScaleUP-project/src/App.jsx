import React, { useState } from 'react';
import './App.css';
import top1 from '../src/assets/img/top1.jpg';
import bottom1 from '../src/assets/img/bottom1.jpg';
import top2 from '../src/assets/img/top2.jpg';
import bottom2 from '../src/assets/img/bottom2.jpg';
import top3 from '../src/assets/img/top3.jpg';
import bottom3 from '../src/assets/img/bottom3.jpg';
import acc1 from '../src/assets/img/acc1.jpg';
import acc2 from '../src/assets/img/acc2.jpg';
import logo from '../src/assets/img/logo.png';
import CartModal from './CartModal';

const products = [
  { id: 1, name: "EH - Cargo pants", category: "Bottoms", image: bottom1 },
  { id: 2, name: "EH -  Windbreaker", category: "Tops", image: top1 },
  { id: 3, name: "EH - Chain Bracelet", category: "Accessories", image: acc1 },
  { id: 4, name: "EH - Flare Pants", category: "Bottoms", image: bottom2 },
  { id: 5, name: "EH -  Mammut Jacket", category: "Tops", image: top2 },
  { id: 6, name: "EH - Long Shorts", category: "Bottoms", image: bottom3 },
  { id: 7, name: "EH -  Skeletal Shirt", category: "Tops", image: top3 },
  { id: 8, name: "EH -  Star Ring", category: "Accessories", image: acc2 },
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
        <button onClick={() => setActiveCategory('Accessories')}>Accessories</button>
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

