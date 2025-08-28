import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // ← icône moderne
import "./Header.css";
import { useCart } from "./CartContext";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isFixed, setIsFixed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector(".site-header");
    let headerOffsetTop = header ? header.offsetTop : 0;

    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsFixed(window.scrollY > headerOffsetTop);
      }
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsFixed(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <header className={`site-header ${isFixed ? "fixed" : ""}`}>
      <div className="header-container">
        <h1 className="site-logo">Ch9An9irA</h1>
        <nav className="header-nav">
          <Link to="/">Accueil</Link>
          <Link to="/#products">Produits</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/cart" className="cart-icon">
            <FiShoppingCart size={28} /> {/* taille personnalisable */}
            {getCartItemsCount() > 0 && (
              <span className="cart-count">{getCartItemsCount()}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
