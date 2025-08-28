import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";
import logo from "/public/logo-white.png";

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
                    <a href="/home">
                        <img src={logo} alt="RX Castillo Digital" />
                    </a>
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
                    <li><a href="/home" onClick={closeMenu}>Inicio</a></li>
                    <li><a href="/aboutus" onClick={closeMenu}>Conócenos</a></li>
                    <li><a href="/service" onClick={closeMenu}>Servicios</a></li>
                    <li><a href="/gallery" onClick={closeMenu}>Galería</a></li>
                    <li><a href="/contact" onClick={closeMenu}>Contacto</a></li>

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
