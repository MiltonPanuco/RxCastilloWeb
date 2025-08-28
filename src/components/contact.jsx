import React from "react";
import Carousel from "../components/carousel";
import "../styles/contact.css"
import "../styles/complement.css"

const slidesContact = [
    {
        image: "/images/contact/carousel/image1.jpg",
        title: "Contáctanos",
    },
    {
        image: "/images/contact/carousel/image2.jpg",
        title: "Estamos más cerca de ti",
    },
    {
        image: "/images/contact/carousel/image3.jpg",
        title: "Queremos ayudarte",
    },
];

const Contact = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = "523231945292"
        const message = "Hola, me interesa conocer más sobre sus servicios digitales."
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    const handlePhoneClick = () => {
        window.location.href = "tel:+523231945292"
    }

    return (

        <section className="contact-container">

            <Carousel slides={slidesContact} />

            <div className="contact-main-container">
                {/* Orbes flotantes 
                <div className="floating-orbs">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                    <div className="orb orb-3"></div>
                    <div className="orb orb-4"></div>
                    <div className="orb orb-5"></div>
                    <div className="orb orb-6"></div>
                </div>*/}

                <h2 className="contact-section-title">Escríbenos</h2>

                <div className="contact-grid">
                    {/* Horario */}
                    <div className="contact-feature-card contact-schedule-card">
                        <div className="contact-feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="contact-feature-content">
                            <h3>Horario de Atención</h3>
                            <div className="schedule-details">
                                <div className="schedule-day">
                                    <span className="day-name">Lunes</span>
                                    <span className="day-hours">08:30 AM - 02:00 PM</span>
                                    <span className="day-hours">04:00 PM - 07:00 PM</span>
                                </div>
                                <div className="schedule-day">
                                    <span className="day-name">Martes</span>
                                    <span className="day-hours">08:30 AM - 02:00 PM</span>
                                    <span className="day-hours">04:00 PM - 07:00 PM</span>
                                </div>
                                <div className="schedule-day">
                                    <span className="day-name">Miércoles</span>
                                    <span className="day-hours">08:30 AM - 02:00 PM</span>
                                    <span className="day-hours">04:00 PM - 07:00 PM</span>
                                </div>
                                <div className="schedule-day">
                                    <span className="day-name">Jueves</span>
                                    <span className="day-hours">08:30 AM - 02:00 PM</span>
                                    <span className="day-hours">04:00 PM - 07:00 PM</span>
                                </div>
                                <div className="schedule-day">
                                    <span className="day-name">Viernes</span>
                                    <span className="day-hours">08:30 AM - 02:00 PM</span>
                                    <span className="day-hours">04:00 PM - 07:00 PM</span>
                                </div>
                                <div className="schedule-day">
                                    <span className="day-name">Sábado</span>
                                    <span className="day-hours">08:30 AM - 01:00 PM</span>
                                </div>
                                <div className="schedule-day">
                                    <span className="day-name">Domingo</span>
                                    <span className="day-hours">09:00 AM - 1:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teléfono y WhatsApp combinados */}
                    <div className="contact-feature-card contact-phone-card">
                        <div className="contact-feature-content">
                            <h3>Contáctanos por Teléfono</h3>
                            <div className="phone-options">
                                <div className="phone-option" onClick={handlePhoneClick}>
                                    <div className="phone-option-icon phone-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                            />
                                        </svg>
                                    </div>
                                    <div className="phone-option-content">
                                        <span className="phone-number">+52 323 194 5292</span>
                                        <small>Llamar directamente</small>
                                    </div>
                                </div>

                                <div className="phone-option" onClick={handleWhatsAppClick}>
                                    <div className="phone-option-icon whatsapp-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div className="phone-option-content">
                                        <span className="phone-number">+52 323 194 5292</span>
                                        <small>Enviar WhatsApp</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Correo */}
                    <div className="contact-feature-card clickable-card" onClick={() => window.location.href = 'mailto:rxcastillodigital@gmail.com'}>
                        <div className="contact-feature-icon email-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="contact-feature-content">
                            <h3>Correo</h3>
                            <p>rxcastillodigital@gmail.com</p>
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="contact-feature-card clickable-card" onClick={() => window.open('https://maps.app.goo.gl/VXN4ZshcQzNhK2zC6', '_blank')}>
                        <div className="contact-feature-icon location-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="contact-feature-content">
                            <h3>Dirección</h3>
                            <p>Blvd. Tijuana #150, Ruiz, Nayarit</p>
                        </div>
                    </div>

                    {/* Redes sociales */}
                    <div className="contact-feature-card contact-social-card">
                        <div className="contact-feature-content">
                            <h3>Síguenos</h3>
                            <div className="contact-social-links">
                                <a
                                    href="https://instagram.com/rxcastillodigital"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-social-link instagram"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span>@rxcastillodigital</span>
                                </a>
                                <a
                                    href="https://facebook.com/RXCastilloDigital"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-social-link facebook"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    <span>RX Castillo Digital</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className="contact-map-container">
                    <div className="contact-map-wrapper">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.5016601794387!2d-105.13658092489213!3d21.953701479937298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869e03bef3036c1b%3A0xdfd6eee172571399!2sRX%20Castillo%20Digital!5e0!3m2!1ses!2smx!4v1755820045374!5m2!1ses!2smx&z=18"
                            width="100%"
                            height="400"
                            style={{ border: 0, pointerEvents: 'none' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de RX Castillo Digital"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact