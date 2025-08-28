import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartOrderForm from './CartOrderForm';
import { useCart } from '../components/CartContext';
import { FiTrash2 } from "react-icons/fi"; // icône poubelle
import './CartPage.css';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [showForm, setShowForm] = React.useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="cart-page">
          <div className="container">
            <h2>Votre panier est vide</h2><br/>
            <p>Découvrez nos produits et ajoutez-les à votre panier.</p><br/><br/>
            <Link to="/#products" className="btn-primary">Voir les produits</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="container">
          <h2>Votre Panier</h2>
          
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{item.price.toFixed(2)} MAD</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  {(item.price * item.quantity).toFixed(2)} MAD
                </div>
                <button 
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 size={22} className="trash-icon" />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              Total: <strong>{getCartTotal().toFixed(2)} MAD</strong>
            </div>

            {!showForm ? (
              <div className="cart-actions">
                <button className="btn-primary" onClick={() => setShowForm(true)}>
                  Commander tout le panier
                </button>
                <button className="btn-secondary" onClick={clearCart}>
                  Vider le panier
                </button>
                <Link to="/#products" className="continue-shopping">
                  Continuer vos achats
                </Link>
              </div>
            ) : (
              <div className="order-form-container">
                <CartOrderForm 
                  cartItems={items} 
                  total={getCartTotal()}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
