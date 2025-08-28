import React, { useState, useEffect, useRef } from 'react';
import Carousel from "../components/carousel";
import '../styles/service.css';

const slidesService = [
    {
        image: "/public/images/service/carousel/image1.png",
        title: "Nuestros Servicios",
    },
    {
        image: "/public/images/service/carousel/image2.jpg",
        title: "Rayos X Digital movil a domicilio",
    },
    {
        image: "/public/images/service/carousel/image3.jpg",
        title: "Electrocardiogramas de 12 Canales portatil",
    },
];

const servicesData = [
    {
        id: 1,
        title: "Rayos X",
        description: "Ofrecemos servicios completos de radiografía digital con tecnología de última generación. Realizamos estudios de tórax para evaluación pulmonar y cardíaca, radiografías de brazos incluyendo húmero, radio y cúbito, estudios de cráneo para diagnóstico neurológico, y radiografías de todas las extremidades y articulaciones. Nuestro equipo especializado garantiza imágenes de alta calidad con la menor exposición a radiación posible.",
        image: "/public/images/service/other/rayosx.jpg"
    },
    {
        id: 2,
        title: "Electrocardiogramas",
        description: "Realizamos electrocardiogramas (ECG) completos para el diagnóstico y seguimiento de condiciones cardíacas. Nuestro servicio incluye ECG en reposo de 12 derivaciones, interpretación inmediata por cardiólogos certificados, y detección temprana de arritmias, infartos y otras patologías cardíacas. Utilizamos equipos digitales de alta precisión que proporcionan resultados confiables para un diagnóstico preciso del estado de su salud cardiovascular.",
        image: "/public/images/service/other/electro.jpg"
    },
    
];

const ServiceCounter = () => {
    const [counts, setCounts] = useState({
        clients: 0,
        radiographies: 0,
        electrocardiograms: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef(null);

    const targets = {
        clients: 500,
        radiographies: 600,
        electrocardiograms: 200
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                }
            },
            {
                threshold: 0.8,
                rootMargin: '0px'
            }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2500;
        const frameRate = 60;
        const totalFrames = Math.round(duration / (1000 / frameRate));

        Object.keys(targets).forEach(key => {
            let currentFrame = 0;
            const increment = targets[key] / totalFrames;

            const timer = setInterval(() => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.round(easeOutQuart * targets[key]);

                setCounts(prev => ({
                    ...prev,
                    [key]: currentValue
                }));

                if (currentFrame >= totalFrames) {
                    clearInterval(timer);
                    setCounts(prev => ({
                        ...prev,
                        [key]: targets[key]
                    }));
                }
            }, 1000 / frameRate);
        });
    }, [isVisible]);

    return (
        <div className="stats-container">
            <div className="stats-background">
                <div className="stats-grid" ref={counterRef}>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <div className="icon-circle clients">
                                <span>👥</span>
                            </div>
                        </div>
                        <div className="stat-number">+{counts.clients}</div>
                        <div className="stat-label">Clientes Satisfechos</div>
                        <div className="stat-bar">
                            <div className="stat-fill clients-fill" style={{ width: isVisible ? '100%' : '0%' }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <div className="icon-circle radiographies">
                                <span>🏥</span>
                            </div>
                        </div>
                        <div className="stat-number">+{counts.radiographies}</div>
                        <div className="stat-label">Radiografías</div>
                        <div className="stat-bar">
                            <div className="stat-fill radiographies-fill" style={{ width: isVisible ? '100%' : '0%' }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <div className="icon-circle electrocardiograms">
                                <span>❤️</span>
                            </div>
                        </div>
                        <div className="stat-number">+{counts.electrocardiograms}</div>
                        <div className="stat-label">Electrocardiogramas</div>
                        <div className="stat-bar">
                            <div className="stat-fill electrocardiograms-fill" style={{ width: isVisible ? '100%' : '0%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente CTA integrado
const MedicalCTA = () => {
    const handleWhatsAppClick = () => {
        // Reemplaza con tu número de WhatsApp
        const phoneNumber = "523231945292"
        const message = "¡Hola! Quiero agendar, ¿Cuál es su disponibilidad?"
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    return (
        <section className="service-cta-section">
            <div className="service-cta-grid">
                {/* Lado izquierdo - Contenido */}
                <div className="service-cta-content">

                    {/* Título principal */}
                    <h2 className="service-cta-title">
                        Tu salud
                        <span className="service-cta-accent"> no puede esperar</span>
                    </h2>

                    {/* Subtítulo */}
                    <p className="service-cta-description">
                        Agenda tu estudio médico ahora y recibe atención inmediata con tecnología de vanguardia
                    </p>

                    {/* Lista de beneficios */}
                    <ul className="service-cta-benefits">
                        <li className="service-cta-benefit">
                            <svg className="service-cta-check-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="service-cta-benefit-text">Resultados en menos de 24 horas</span>
                        </li>
                        <li className="service-cta-benefit">
                            <svg className="service-cta-check-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="service-cta-benefit-text">Equipo médico certificado</span>
                        </li>
                        <li className="service-cta-benefit">
                            <svg className="service-cta-check-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="service-cta-benefit-text">Sin filas, sin esperas</span>
                        </li>
                    </ul>

                </div>

                {/* Lado derecho - Información de contacto */}
                <div className="service-cta-contact">
                    <div className="service-cta-contact-card">
                        
                        {/* Icono principal */}
                        <div className="service-cta-icon">
                            <div className="service-cta-icon-circle">
                                <svg className="service-cta-phone-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                        </div>

                        {/* Título de contacto */}
                        <h3 className="service-cta-contact-title">¡Contáctanos ahora!</h3>

                        {/* Descripción */}
                        <p className="service-cta-contact-desc">
                            Nuestro equipo está listo para atenderte y resolver todas tus dudas de forma inmediata.
                        </p>

                        <button className="service-cta-button" onClick={handleWhatsAppClick}>
                            <svg className="service-cta-button-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span>Agendar Ahora</span>
                            <svg className="service-cta-button-arrow" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

function Service() {
    return (
        <div className="service-container">
            <Carousel slides={slidesService} />

            <header className="service-header">
                <h1 className="service-title">
                    Lo que ofrecemos
                </h1>
                <p className="service-subtitle">
                    Cuidamos tu salud con estudios radiográficos y electrocardiogramas confiables, acompañados de interpretación profesional.
                </p>
            </header>

            {servicesData.map((service, index) => (
                <div
                    key={service.id}
                    className={`service-section ${index % 2 === 1 ? 'service-section-reverse' : ''}`}
                >
                    <div className="service-image-container">
                        <div className="service-image-wrapper">
                            <div className="service-image-background">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="service-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="service-content">
                        <h2 className="service-card-title">
                            {service.title}
                        </h2>
                        <p className="service-card-description">
                            {service.description}
                        </p>
                    </div>
                </div>
            ))}

            <ServiceCounter />

            <MedicalCTA />

        </div>
    );
}

export default Service;