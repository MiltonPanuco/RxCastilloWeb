import React from "react";
import Carousel from "../components/carousel";
import "../styles/home.css";

const slidesInicio = [
    {
        image: "/images/home/carousel/image1.jpeg",
        title: "RX Castillo Digital",
    },
    {
        image: "/images/home/carousel/image2.jpg",
        title: "Ruiz Nayarit, México",
    },
    {
        image: "/images/home/carousel/image3.jpg",
        title: "Tu salud, nuestra misión, donde estés",
    },
];

const Home = () => {
    const features = [
        {
            icon: "🏡",
            title: "Servicio a Domicilio",
            description: "Llevamos nuestro equipo profesional hasta la comodidad de tu hogar, sin necesidad de traslados."
        },
        {
            icon: "💬",
            title: "Interpretación Incluida",
            description: "Nuestros especialistas te explican los resultados de manera clara y comprensible."
        },
        {
            icon: "⚡",
            title: "Resultados Rápidos",
            description: "Entregamos tus estudios en el menor tiempo posible sin comprometer la calidad."
        },
        {
            icon: "🔬",
            title: "Tecnología de Punta",
            description: "Utilizamos equipos de última generación para obtener imágenes de alta calidad."
        },
        {
            icon: "💰️",
            title: "Precios Accesibles",
            description: "Ofrecemos tarifas competitivas sin sacrificar la calidad del servicio."
        },
        {
            icon: "🕐",
            title: "Horarios Flexibles",
            description: "Nos adaptamos a tu agenda con horarios extendidos y disponibilidad de fin de semana."
        }
    ];

    const testimonials = [
        {
            name: "Damián Ramírez",
            rating: 5,
            comment: "Excelente servicio a domicilio. Muy profesionales y puntuales. Los resultados fueron entregados el mismo día."
        },
        {
            name: "Carlos Rodríguez",
            rating: 5,
            comment: "La interpretación fue muy clara y detallada. El doctor se tomó el tiempo de explicarme todo perfectamente."
        },
        {
            name: "Ana Martínez",
            rating: 4,
            comment: "Muy conveniente el servicio a domicilio. Personal amable y equipo moderno. Totalmente recomendado."
        },
        {
            name: "Mario Avena",
            rating: 5,
            comment: "Precios justos y excelente calidad. No tuve que salir de casa y recibí atención de primera."
        },
        {
            name: "Carmen Silva",
            rating: 5,
            comment: "Rapidez en la entrega y profesionalismo excepcional. Definitivamente volveré a usar sus servicios."
        },
        {
            name: "Roberto Díaz",
            rating: 4,
            comment: "Muy satisfecho con el servicio. Puntualidad, calidad y precios accesibles. Altamente recomendable."
        }
    ];

    const testimonials2 = [
        {
            name: "Laura Hernández",
            rating: 5,
            comment: "Un servicio rápido y confiable. Me atendieron en casa y todo el proceso fue muy cómodo."
        },
        {
            name: "Jorge Castillo",
            rating: 5,
            comment: "El doctor explicó con mucha paciencia mis resultados, se nota la experiencia y dedicación."
        },
        {
            name: "Paola Jiménez",
            rating: 4,
            comment: "Me gustó mucho la atención, muy amables y el equipo se ve moderno. Volvería a solicitarlo."
        },
        {
            name: "Andrés López",
            rating: 5,
            comment: "Excelente trato, muy profesionales y puntuales. Además los precios son justos."
        },
        {
            name: "Verónica Torres",
            rating: 5,
            comment: "La entrega de resultados fue súper rápida y detallada. Sin duda los volveré a contactar."
        },
        {
            name: "Eduardo Vargas",
            rating: 4,
            comment: "Muy recomendable, el servicio a domicilio me facilitó todo y la atención fue de calidad."
        }
    ];


    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`home-rating-star ${index < rating ? 'filled' : 'empty'}`}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="home-container">
            <Carousel slides={slidesInicio} />

            <section className="home-why-choose-us">
                <div className="home-main-container">
                    <h2 className="home-section-title">¿Por qué elegirnos?</h2>
                    <div className="home-features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="home-feature-card">
                                <div className="home-feature-icon">{feature.icon}</div>
                                <h3 className="home-feature-title">{feature.title}</h3>
                                <p className="home-feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-quick-presentation">
                <div className="home-main-container">
                    <div className="home-presentation-content">
                        <h2 className="home-presentation-title">Radiografías Profesionales</h2>
                        <p className="home-presentation-text">
                            Realizamos radiografías a domicilio, con resultados claros y atención humana.
                            Nuestro compromiso es brindarte un servicio de calidad con la comodidad que te mereces.
                        </p>
                        <button className="home-cta-button" onClick={() => window.location.href = '/service'}>
                            Ver nuestros servicios
                        </button>
                    </div>
                </div>
            </section>

            <section className="home-testimonials-section">
                <div className="home-main-container">
                    <h2 className="home-section-title">Lo que dicen nuestros pacientes</h2>
                </div>
                <div className="home-testimonials-marquee">
                    <div className="home-testimonials-track">
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div key={index} className="home-testimonial-card">
                                <div className="home-testimonial-header">
                                    <h4 className="home-testimonial-name">{testimonial.name}</h4>
                                    <div className="home-testimonial-rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                                <p className="home-testimonial-comment">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="home-testimonials-marquee">
                    <div className="home-testimonials-track reverse">
                        {[...testimonials2, ...testimonials2].map((testimonial, index) => (
                            <div key={`reverse-${index}`} className="home-testimonial-card">
                                <div className="home-testimonial-header">
                                    <h4 className="home-testimonial-name">{testimonial.name}</h4>
                                    <div className="home-testimonial-rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                                <p className="home-testimonial-comment">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;