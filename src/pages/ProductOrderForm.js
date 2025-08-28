import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ProductOrderForm.css';

const ProductOrderForm = ({ product, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      products: `${product.name} (x1) - ${product.price.toFixed(2)} MAD`,
      total: product.price.toFixed(2) ,
    };

    emailjs.send(
      'service_t1anlop',    // ton service EmailJS
      'template_f2r8abt',   // ton template EmailJS
      templateParams,
      'hHPVbYKZyxgi79Lgy'  // ton user/public key EmailJS
    )
    .then(() => setSuccessMsg('✅ Commande envoyée avec succès ! Nous vous contacterons bientôt.'))
    .catch((err) => console.error('Erreur EmailJS:', err));
  };

  return (
    <div className="order-form-container">
      <form className="order-form" onSubmit={handleSubmit}>
        <h3>Commander {product.name}</h3>

        <input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Votre numéro de téléphone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Adresse de livraison" value={formData.address} onChange={handleChange} required />

        <div className="form-buttons">
          <button type="submit">Confirmer la commande</button>
          <button type="button" onClick={onCancel} className="btn-secondary">Annuler</button>
        </div>

        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
    </div>
  );
};

export default ProductOrderForm;
