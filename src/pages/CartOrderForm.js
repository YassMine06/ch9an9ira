import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useCart } from '../components/CartContext';
import './CartOrderForm.css';

const CartOrderForm = ({ cartItems, total, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const { clearCart } = useCart();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productsList = cartItems.map(item =>
      `${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} MAD`
    ).join('\n');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      products: productsList,
      total: total.toFixed(2),
    };

    emailjs.send(
      'service_t1anlop',
      'template_f2r8abt',
      templateParams,
      'hHPVbYKZyxgi79Lgy'
    )
    .then(() => {
      // Affiche le message de succès
      setSuccessMsg('✅ Commande envoyée avec succès ! Nous allons vous appeler pour confirmer.');

      // Vide le panier après 5 secondes
      setTimeout(() => {
        clearCart();
        setFormData({ name: '', email: '', phone: '', address: '' });
      }, 5000);
    }, (error) => {
      console.error('❌ Erreur lors de l\'envoi :', error);
    });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Commander tout le panier</h3>
      
      <div className="order-summary">
        <h4>Récapitulatif de la commande:</h4>
        {cartItems.map(item => (
          <div key={item.id} className="order-item">
            {item.name} x {item.quantity} - {(item.price * item.quantity).toFixed(2)} MAD
          </div>
        ))}
        <div className="order-total">Total: {total.toFixed(2)} MAD</div>
      </div>

      <input
        type="text"
        name="name"
        placeholder="Votre nom"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Votre numéro de téléphone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Adresse de livraison"
        value={formData.address}
        onChange={handleChange}
        required
      />
      
      <div className="form-buttons">
        <button type="submit">Confirmer la commande</button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Annuler
        </button>
      </div>
      
      {successMsg && <p className="success-msg">{successMsg}</p>}
    </form>
  );
};

export default CartOrderForm;
