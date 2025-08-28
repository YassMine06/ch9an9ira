import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/Products';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../components/CartContext'; // Ajout


const Home = () => {
  const location = useLocation();
  const { addToCart } = useCart(); // Ajout

  useEffect(() => {
    if (location.hash === "#products") {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const scrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('head');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fonction pour ajouter au panier depuis la page d'accueil
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // alert('Produit ajouté au panier!');
  };

  return (<>
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Découvrez nos produits exceptionnels</h1>
          <a href="#products" className="scroll-down" onClick={scrollToProducts}>
            ↓
          </a>
        </div>
      </header>
    <div id='head'><Header/></div>

      <section id="products" className="products-section">
        <h2 className="section-title">Nos Produits</h2>
        <div className="products-grid">
          {products.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="product-card-link"
            >
              <div className="product-card">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="product-image" 
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price.toFixed(2)} MAD</p>
                  {/* Bouton Ajouter au panier */}
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    🛒
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div></>
  );
};

export default Home;