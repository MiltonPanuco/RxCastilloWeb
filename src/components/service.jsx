import React, { useState, useEffect, useRef } from 'react';
import Carousel from "../components/carousel";
import '../styles/service.css';

// Datos del carousel
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

// Datos de servicios principales
const servicesData = [
    {
        id: 1,
        title: "Rayos X",
        description: "Ofrecemos servicios completos de radiografía digital con tecnología de última generación. Realizamos estudios de tórax para evaluación pulmonar y cardíaca, radiografías de brazos incluyendo húmero, radio y cúbito, estudios de cráneo para diagnóstico neurológico, y radiografías de todas las extremidades y articulaciones. Nuestro equipo especializado garantiza imágenes de alta calidad con la menor exposición a radiación posible.",
        image: "/public/images/service/other/rayosx.jpg",
        features: [
            "Menor exposición a radiación",
            "Imágenes de alta resolución",
            "Resultados inmediatos",
            "Interpretación profesional"
        ]
    },
    {
        id: 2,
        title: "Electrocardiogramas",
        description: "Realizamos electrocardiogramas (ECG) completos para el diagnóstico y seguimiento de condiciones cardíacas. Nuestro servicio incluye ECG en reposo de 12 derivaciones, interpretación inmediata por cardiólogos certificados, y detección temprana de arritmias, infartos y otras patologías cardíacas. Utilizamos equipos digitales de alta precisión que proporcionan resultados confiables para un diagnóstico preciso del estado de su salud cardiovascular.",
        image: "/public/images/service/other/electro.jpg",
        features: [
            "Equipos de alta precisión",
            "Interpretación inmediata",
            "Personal especializado",
            "Estudios de reposo y esfuerzo"
        ]
    }
];

// Tipos de RX - Nueva sección mejorada
const rxTypes = [
    {
        icon: "fas fa-lungs",
        title: "Radiografía de Tórax",
        description: "Evaluación completa de pulmones, corazón y estructuras torácicas"
    },
    {
        icon: "fas fa-bone",
        title: "Radiografía de Huesos",
        description: "Detección de fracturas, luxaciones y patologías óseas"
    },
    {
        icon: "fas fa-procedures",
        title: "Columna Vertebral",
        description: "Estudio completo de la columna cervical, dorsal y lumbar"
    },
    {
        icon: "fas fa-hand-paper",
        title: "Extremidades",
        description: "Radiografías de brazos, piernas, manos y pies"
    },
    {
        icon: "fas fa-heartbeat",
        title: "Electrocardiograma",
        description: "Monitoreo de la actividad eléctrica del corazón"
    },
    {
        icon: "fas fa-user-md",
        title: "Estudios Especializados",
        description: "Consulta por estudios específicos según tu necesidad"
    }
];

// Componente ServiceCounter mejorado
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

// Componente MedicalCTA
const MedicalCTA = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = "523231945292"
        const message = "¡Hola! Quiero agendar, ¿Cuál es su disponibilidad?"
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    return (
        <section className="service-cta-section">
            <div className="service-cta-grid">
                <div className="service-cta-content">
                    <h2 className="service-cta-title">
                        Tu salud
                        <span className="service-cta-accent"> no puede esperar</span>
                    </h2>
                    <p className="service-cta-description">
                        Agenda tu estudio médico ahora y recibe atención inmediata con tecnología de vanguardia
                    </p>
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

                <div className="service-cta-contact">
                    <div className="service-cta-contact-card">
                        <div className="service-cta-icon">
                            <div className="service-cta-icon-circle">
                                <svg className="service-cta-phone-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="service-cta-contact-title">¡Contáctanos ahora!</h3>
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

// Componente principal Service
function Service() {
    return (
        <div className="service-container">
            <Carousel slides={slidesService} />

            <header className="service-header">
                <h1 className="service-title">
                    Lo que ofrecemos
                </h1>
                <p className="service-subtitle">
                    Cuidamos tu salud con estudios radiográficos y electrocardiogramas confiables,
                    acompañados de interpretación profesional y tecnología de vanguardia.
                </p>
            </header>

            {/* Nueva sección de tipos de RX */}
            <section className="rx-types-section">
                <h2 className="rx-types-title">Tipos de Estudios Disponibles</h2>
                <div className="rx-types-grid">
                    {rxTypes.map((rxType, index) => (
                        <div key={index} className="rx-type-card">
                            <div className="rx-icon">
                                <i className={rxType.icon}></i>
                            </div>
                            <h3 className="rx-type-title">{rxType.title}</h3>
                            <p className="rx-type-description">{rxType.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Servicios principales con características mejoradas */}
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
                        {service.features && (
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <i className="fas fa-check-circle"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}

        </div>
    );
}

export default Service;