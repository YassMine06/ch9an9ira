import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/Products.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductOrderForm from './ProductOrderForm.js';
import './ProductPage.css';
import { useCart } from '../components/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setCurrentImage(0);
    setShowForm(false);
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="product-page">
          <div className="container">
            <h2>Produit non trouvé</h2>
            <p>Le produit que vous recherchez n'existe pas.</p>
            <Link to="/" className="btn-primary">Retour à l'accueil</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const handleAddToCart = () => addToCart(product);

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="container">
          <div className="product-detail">
            <div className="product-image-large">
              <img src={product.images[currentImage]} alt={product.name} />
              {product.images.length > 1 && (
                <div className="slider-buttons">
                  <button onClick={prevImage}>‹</button>
                  <button onClick={nextImage}>›</button>
                </div>
              )}
            </div>

            <div className="product-info-large">
              <h1>{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-price-large">{product.price.toFixed(2)} MAD</p><br/>

              <div className="product-buttons">
                <button className="btn-secondary" onClick={handleAddToCart}>
                  Ajouter au panier
                </button>
                {!showForm && (
                  <button className="btn-primary" onClick={() => setShowForm(true)}>
                    Passer commande
                  </button>
                )}
              </div>

              {showForm && (
                <ProductOrderForm 
                  product={product} 
                  onCancel={() => setShowForm(false)} 
                />
              )}
            </div>
          </div>

          <div className="other-products-section">
            <h2>
              <Link to="/#products" className="link-to-products">Autres produits</Link>
            </h2>
            <div className="other-products-scroll">
              {products.filter(p => p.id !== product.id).map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="other-product-card">
                  <img src={p.images[0]} alt={p.name} />
                  <p>{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
