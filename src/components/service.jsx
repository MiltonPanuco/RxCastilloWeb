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

// Estadísticas
const stats = [
    { number: "5000+", label: "Estudios Realizados" },
    { number: "98%", label: "Satisfacción del Cliente" },
    { number: "24/7", label: "Disponibilidad" },
    { number: "10+", label: "Años de Experiencia" }
];

// Componente principal Service
function Service() {
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateNumbers();
                    // Desconectar el observer después de la primera animación
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number');

        numbers.forEach(number => {
            const finalNumber = number.textContent;
            const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
            let currentNumber = 0;
            const increment = numericValue / 50;

            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= numericValue) {
                    number.textContent = finalNumber;
                    clearInterval(timer);
                } else {
                    if (finalNumber.includes('%')) {
                        number.textContent = Math.floor(currentNumber) + '%';
                    } else if (finalNumber.includes('+')) {
                        number.textContent = Math.floor(currentNumber).toLocaleString() + '+';
                    } else if (finalNumber.includes('/')) {
                        number.textContent = finalNumber;
                    } else {
                        number.textContent = Math.floor(currentNumber).toLocaleString();
                    }
                }
            }, 50);
        });
    };

    return (
        <div className="service-container">
            <Carousel slides={slidesService} />

            {/* Sección de tipos de RX */}
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

            {/* Sección de estadísticas */}
            <div ref={statsRef} className="stats-section">
                <h2 className="stats-title">Nuestra Experiencia en Números</h2>
                <p className="stats-subtitle">Años de experiencia cuidando tu salud</p>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección de servicios principales */}
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