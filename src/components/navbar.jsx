import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";
import logo from "/logo-white.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
        document.body.style.overflow = menuOpen ? "auto" : "hidden";
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {

        if (location.pathname === "/terms-conditions" || location.pathname === "/privacy-policy") {
            setScrolled(true);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight * 0.95;
            setScrolled(scrollY > vh);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : "transparent"} nav-extra`}>
            <div className="navbar-content">
                <div className="navbar-logo" onClick={closeMenu}>
                    <Link to="/home">
                        <img src={logo} alt="RX Castillo Digital" />
                    </Link>
                </div>

                <div
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                    <li><Link to="/home" onClick={closeMenu}>Inicio</Link></li>
                    <li><Link to="/aboutus" onClick={closeMenu}>Conócenos</Link></li>
                    <li><Link to="/service" onClick={closeMenu}>Servicios</Link></li>
                    <li><Link to="/gallery" onClick={closeMenu}>Galería</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>Contacto</Link></li>

                    {menuOpen && (
                        <li className="navbar-social">
                            <a href="https://www.facebook.com/profile.php?id=61573839946589" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/rxcastillodigital/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://maps.app.goo.gl/BZkHQLtEk94gtghJ6" target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-map-marker-alt"></i>
                            </a>
                            <a href="https://wa.me/523231945292" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
