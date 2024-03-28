function CartModal({ cartItems, removeFromCart, onClose }) {
  return (
    <div className="cart-modal">
      <button onClick={onClose} className="close-modal">X</button>
      <h2>Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <h4>{item.name}</h4>
          {/* Add more product details if you like */}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
  
export default CartModal;
  