import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/db log.png";

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

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img className="logo-mark" src={logo} alt="" />

        <div>
          <h2>Dhanush Briyani</h2>
          <span>Authentic Firewood Briyani</span>
        </div>
      </Link>

      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
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
