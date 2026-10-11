import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/db log.webp";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navItems = [
    ["01", "Home", "/", pathname === "/"],
    ["02", "About", "/about", pathname === "/about"],
    ["03", "Catering", "/services", pathname === "/services"],
    ["04", "Contact", "/contact", pathname === "/contact"],
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img loading="eager" decoding="async" width="280" height="280" className="logo-mark" src={logo} alt="" />

        <div>
          <h1>DHANUSH BRIYANI</h1>
          <span>FOOD TRUCK & CATERING SERVICE</span>
        </div>
      </Link>

      <nav id="primary-navigation" className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
        {navItems.map(([number, label, href, active]) => (
          <Link
            key={href}
            to={href}
            aria-current={active ? "page" : undefined}
            className={active ? "nav-active" : undefined}
            onClick={closeMenu}
          >
            <span className="nav-number">{number}</span>
            <span className="nav-text">{label}</span>
          </Link>
        ))}
      </nav>

      <Link to="/contact#quotation" className="nav-button" onClick={closeMenu}>
        <span>Get Quotation</span>
        <span className="nav-button-arrow">-&gt;</span>
      </Link>

      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}

export default Navbar;
