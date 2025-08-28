import logoWhite from "/public/logo-white.png"
import "../styles/footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Nombre de empresa y slogan */}
                <div className="brand">
                    <h3 className="title">
                        <a href="/" className="title-link">
                            <span className="title-text">RX Castillo Digital</span>
                        </a>
                    </h3>
                    <p className="slogan">Tu salud, nuestra misión, donde estés</p>
                </div>

                {/* Información profesional */}
                <div className="professional">
                    <div className="professional-content">
                        <div className="feature">
                            <span className="feature-text">Tecnología médica avanzada</span>
                        </div>
                        <div className="feature">
                            <span className="feature-text">Profesionales certificados</span>
                        </div>
                        <div className="feature">
                            <span className="feature-text">Atención 24/7</span>
                        </div>
                        <div className="feature">
                            <span className="feature-text">Privacidad garantizada</span>
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <div className="logo-section">
                    <img src={logoWhite || "/placeholder.svg"} alt="RX Castillo Digital Logo" className="logo" />
                </div>
            </div>

            {/* Separador */}
            <div className="footer-divider"></div>

            {/* Copyright y enlaces legales */}
            <div className="footer-bottom">
                <div className="bottom-left">
                    <p className="copyright">© {new Date().getFullYear()} RX Castillo Digital. Todos los derechos reservados.</p>
                </div>
                <div className="bottom-right">
                    <a href="/terms-conditions" className="legal-link">
                        Términos y Condiciones
                    </a>
                    <span className="separator">|</span>
                    <a href="/privacy-policy" className="legal-link">
                        Aviso de Privacidad
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
