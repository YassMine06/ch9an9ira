import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './components/CartContext'; // Ajout
import CartPage from './pages/CartPage'; // Nouvelle page

function App() {
  return (
    <CartProvider> {/* Ajout du provider */}
      <Router>
        <ScrollToTop />
        <div className="App">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} /> {/* Nouvelle route */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;