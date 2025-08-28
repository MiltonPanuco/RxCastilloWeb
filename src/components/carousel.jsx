import { useEffect, useState } from "react";
import "../styles/carousel.css";

export default function Carousel({ slides = [] }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 7000);

        return () => clearInterval(timer);
    }, [slides]);

    if (slides.length === 0) {
        return null;
    }

    return (
        <div className="carousel-container">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`carousel-slide ${index === current ? "active" : ""}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    {index === 0 ? (
                        <div className="carousel-content-first">
                            <div className="carousel-title-left">
                                <h2>{slide.title}</h2>
                            </div>
                            <div className="carousel-description-right">
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="carousel-title-centered">
                            <h2>{slide.title}</h2>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}