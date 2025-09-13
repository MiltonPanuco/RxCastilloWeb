import React from 'react';
import Carousel from "../components/carousel";
import '../styles/about-us.css';

const slidesAbout = [
    {
        image: "/images/about-us/carousel/image1.jpg",
        title: "¿Quiénes Somos?",
    },
    {
        image: "/images/about-us/carousel/image2.jpg",
        title: "Trabajando desde 2005",
    },
    {
        image: "/images/about-us/carousel/image3.jpeg",
        title: "Detrás de todo servicio, hay personas",
    },
];

function AboutUs() {
    return (
        <div className="aboutus-container">
            <Carousel slides={slidesAbout} />

            {/* Historia y origen del proyecto */}
            <section className="history-section">
                <div className="history-content">
                    <div className="history-image">
                        <img
                            src="/images/about-us/ptr-richard-castillo.jpeg"
                            alt="Ptr. Richard Castillo Martinez - Fundador de RX Castillo Digital"
                            className="founder-photo"
                        />
                        <div className="image-decoration">
                            <div className="decoration-circle"></div>
                            <div className="decoration-dots"></div>
                        </div>
                    </div>

                    <div className="history-text">
                        <h2 className="history-title">El Sueño Que Se Hizo Realidad</h2>
                        <div className="history-story">

                            <p>
                                RX Castillo Digital nació de una necesidad, pero creció con propósito.
                            </p>

                            <p>
                                Desde el año 2005, el Ptr. Richard Castillo Martínez ha estado comprometido con la salud de las personas, trabajando día con día en su estudio con un sueño en mente: llevar servicios radiológicos a lugares donde simplemente no existían.
                            </p>

                            <p>
                                En Ruiz, Nayarit, era común escuchar historias frustrantes: largas horas de espera en el hospital, equipos fuera de servicio, o la necesidad de trasladarse hasta Tepic para poder obtener una radiografía. Situaciones así motivaron una pregunta que no dejó de sonar: <em>¿y si llevamos nosotros el servicio hasta la gente?</em>
                            </p>

                            <p>
                                Como todo lo que vale la pena, este camino vino con tropiezos, miedos y momentos de duda. Pero también trajo esperanza. Como aquella primera visita a domicilio, cuando atendimos a Don Luis, un hombre de campo que llevaba varios días con molestias en el pecho. No tenía cómo trasladarse y el hospital más cercano no podía atenderlo. Esa tarde, al llegar con nuestro equipo portátil y realizar el estudio en su propio hogar, supimos que estábamos en el camino correcto.
                            </p>

                            <p>
                                Hoy RX Castillo Digital es más que un servicio: es una misión de vida. Representa años de preparación, el respaldo de una familia unida y la convicción de que la salud no debería depender de la distancia. Cada radiografía que tomamos, cada hogar que visitamos, es un recordatorio de por qué empezamos y de por qué seguimos: para estar cerca cuando más se necesita.
                            </p>

                            <div className="quote-section">
                                <div className="quote-mark">"</div>
                                <p className="history-quote">
                                    Nacimos con poco, pero con el corazón lleno de propósito… porque desde el inicio supimos que tu salud sería nuestra misión, donde estés.
                                </p>
                                <div className="quote-author">- Ptr. Richard Castillo Martínez</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección por qué confiar en nosotros */}
            <section className="strengths-section">
                <div className="strengths-container">
                    <div className="strengths-content">
                        <div className="strengths-text">
                            <h2 className="strengths-title">¿Por Qué Confiar En Nosotros?</h2>
                            <p className="strengths-description">
                                Nuestro compromiso con la excelencia médica, la tecnología avanzada y el cuidado
                                personalizado nos convierte en la mejor opción para sus estudios de diagnóstico por imágenes.
                            </p>

                            <div className="strengths-list">
                                <div className="strength-item">
                                    <div className="strength-icon">
                                        🏆
                                    </div>
                                    <div className="strength-content">
                                        <h4>Experiencia Médica Certificada</h4>
                                        <p>Más de 15 años de especialización en diagnóstico por imágenes con certificaciones internacionales</p>
                                    </div>
                                </div>

                                <div className="strength-item">
                                    <div className="strength-icon">
                                        ⚡
                                    </div>
                                    <div className="strength-content">
                                        <h4>Tecnología de Última Generación</h4>
                                        <p>Equipos digitales de alta resolución que garantizan precisión diagnóstica superior</p>
                                    </div>
                                </div>

                                <div className="strength-item">
                                    <div className="strength-icon">
                                        👥
                                    </div>
                                    <div className="strength-content">
                                        <h4>Atención Médica Integral</h4>
                                        <p>Personal especializado que brinda cuidado personalizado en cada procedimiento</p>
                                    </div>
                                </div>

                                <div className="strength-item">
                                    <div className="strength-icon">
                                        🛡️
                                    </div>
                                    <div className="strength-content">
                                        <h4>Máxima Seguridad Radiológica</h4>
                                        <p>Protocolos estrictos de protección y dosis mínimas de radiación para su seguridad</p>
                                    </div>
                                </div>

                                <div className="strength-item">
                                    <div className="strength-icon">
                                        ⏱️
                                    </div>
                                    <div className="strength-content">
                                        <h4>Resultados Rápidos y Precisos</h4>
                                        <p>Entrega de informes médicos en tiempo récord sin comprometer la calidad diagnóstica</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="strengths-visual">
                            <div className="visual-elements">
                                <div className="medical-cross"></div>
                                <div className="orbit-ring orbit-ring-1"></div>
                                <div className="orbit-ring orbit-ring-2"></div>
                                <div className="orbit-ring orbit-ring-3"></div>
                                <div className="floating-element"></div>
                                <div className="floating-element"></div>
                                <div className="floating-element"></div>
                                <div className="floating-element"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de valores y filosofía */}
            <section className="values-section">
                <div className="values-container">
                    <div className="values-header">
                        <h2 className="values-title">Lo Que Nos Define</h2>
                        <p className="values-subtitle">
                            Más que un negocio, somos una familia comprometida con el crecimiento y desarrollo de nuestra comunidad, trabajando día a día para brindar el mejor servicio y crear vínculos duraderos con cada cliente.
                        </p>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <div className="icon-wrapper">
                                    <span>🎯</span>
                                </div>
                            </div>
                            <h3>Nuestra Misión</h3>
                            <p>
                                Brindar servicios digitales de calidad excepcional, facilitando el acceso a la
                                tecnología para toda nuestra comunidad, con calidez humana y profesionalismo.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <div className="icon-wrapper">
                                    <span>👁️</span>
                                </div>
                            </div>
                            <h3>Nuestra Visión</h3>
                            <p>
                                Ser el centro digital de referencia en la región, reconocidos por nuestra
                                innovación, calidad de servicio y compromiso con el desarrollo de nuestra comunidad.
                            </p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <div className="icon-wrapper">
                                    <span>❤️</span>
                                </div>
                            </div>
                            <h3>Nuestros Valores</h3>
                            <p>
                                Compromiso, calidad, innovación y cercanía. Creemos en el poder de la tecnología
                                para transformar vidas, siempre con un trato humano y personalizado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default AboutUs;
