import React, { useEffect, useState } from "react";
import "../styles/loading.css";

const Loading = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Bloquear scroll al entrar
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setFadeOut(true); 

            const exitDelay = setTimeout(() => {
                // Reactivar scroll justo antes de desaparecer
                document.body.style.overflow = "auto";
                // onComplete();
            }, 600);

            return () => clearTimeout(exitDelay);
        }, 2000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto"; // por seguridad, si se desmonta
        };
    }, [onComplete]);

    return (
        <div className={`loader-overlay ${fadeOut ? "fade-out" : ""}`}>
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </div>
    );
};

export default Loading;
