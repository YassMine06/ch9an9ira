import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = { ...formData };

    emailjs.send(
      'service_t1anlop',             // Ton Service ID EmailJS
      'template_2f2gdtk',         // Crée un template spécifique pour contact
      templateParams,
      'hHPVbYKZyxgi79Lgy'            // Ton Public Key EmailJS
    )
    .then(() => {
      setSuccessMsg('Message envoyé avec succès ! Nous vous répondrons rapidement.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, (error) => {
      console.error('Erreur lors de l’envoi :', error);
    });
  };

  return (<>
    <Header/>
    <div className="contact-page">
      <h2>Contactez-nous</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
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
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Envoyer</button>
        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
