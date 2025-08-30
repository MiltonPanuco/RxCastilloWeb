import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Carousel from "../components/carousel";

import '../styles/gallery.css';

const slidesGallery = [
  {
    image: "/public/images/gallery/carousel/image1.jpg",
    title: "Recuerdos Digitales",
  },
  {
    image: "/public/images/gallery/carousel/image2.jpg",
    title: "Nuestro Equipo",
  },
  {
    image: "/public/images/gallery/carousel/image3.jpg",
    title: "Fotografías",
  },
];

const Gallery = () => {
  const toolsData = [
    {
      id: 1,
      title: "Detector - Flat Panel",
      description: "El flat panel inalámbrico de SIUI es un detector digital de silicio amorfo de alto rendimiento, ideal para radiología humana y veterinaria. Su diseño liviano y compatible con generadores portátiles lo hace perfecto para aplicaciones móviles. Junto con el software de imagen de SIUI, ofrece alta calidad diagnóstica y una solución integral en radiología digital.",
      images: [
        "/public/images/gallery/panel/panel1.jpeg",
        "/public/images/gallery/panel/panel2.jpg",
        "/public/images/gallery/panel/panel3.jpeg",
        "/public/images/gallery/panel/panel4.jpg",
        "/public/images/gallery/panel/panel5.jpeg",
        "/public/images/gallery/panel/panel6.jpg",
        "/public/images/gallery/panel/panel7.jpeg",
        "/public/images/gallery/panel/panel8.jpeg"
      ]
    },
    {
      id: 2,
      title: "Tubo de Rayos X / SR-8100S",
      description: "El SR-8100S es un generador portátil de rayos X de alta frecuencia, ideal para aplicaciones médicas y veterinarias. Funciona con batería recargable, ofrece hasta 300 exposiciones por carga y cuenta con diseño compacto, colimador con luz LED o láser, y controles digitales precisos. Su portabilidad y rendimiento lo hacen perfecto para uso en campo o emergencias.",
      images: [
        "/public/images/gallery/camara/camara1.jpeg",
        "/public/images/gallery/camara/camara2.jpg",
        "/public/images/gallery/camara/camara3.jpeg",
        "/public/images/gallery/camara/camara4.jpeg",
        "/public/images/gallery/camara/camara5.jpeg",
        "/public/images/gallery/camara/camara6.jpg"
      ]
    },
    {
      id: 3,
      title: "Electrocardiograma de 12 canales",
      description: "El SONOECG12000 es un electrocardiógrafo de 12 canales que ofrece registros precisos y confiables de la actividad cardíaca. Su diseño portátil, pantalla clara y opciones de impresión lo convierten en una herramienta práctica y eficiente para diagnósticos rápidos en consultorios y hospitales.",
      images: [
        "/public/images/gallery/electro/electro1.jpg",
        "/public/images/gallery/electro/electro2.jpg",
        "/public/images/gallery/electro/electro3.jpg",
        "/public/images/gallery/electro/electro4.jpg",
        "/public/images/gallery/electro/electro5.jpeg"
      ]
    }
  ];

  const memoriesImages = [
    "/public/images/gallery/recuerdos/image1.png",
    "/public/images/gallery/recuerdos/image2.jpg",
    "/public/images/gallery/recuerdos/image3.jpg",
    "/public/images/gallery/recuerdos/image4.jpg",
    "/public/images/gallery/recuerdos/image5.jpg",
    "/public/images/gallery/recuerdos/image6.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ images: [], currentIndex: 0, toolId: null });
  const [imageTransition, setImageTransition] = useState({});
  const [modalTransition, setModalTransition] = useState(false);

  useEffect(() => {
    const initialImageIndex = {};
    const initialIsPlaying = {};
    const initialTransition = {};

    toolsData.forEach(tool => {
      initialImageIndex[tool.id] = 0;
      initialIsPlaying[tool.id] = true;
      initialTransition[tool.id] = false;
    });

    setCurrentImageIndex(initialImageIndex);
    setIsPlaying(initialIsPlaying);
    setImageTransition(initialTransition);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }

    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [modalOpen]);

  useEffect(() => {
    const intervals = {};

    toolsData.forEach(tool => {
      if (isPlaying[tool.id]) {
        intervals[tool.id] = setInterval(() => {
          setImageTransition(prev => ({ ...prev, [tool.id]: true }));
          setTimeout(() => {
            setCurrentImageIndex(prev => ({
              ...prev,
              [tool.id]: (prev[tool.id] + 1) % tool.images.length
            }));
            setImageTransition(prev => ({ ...prev, [tool.id]: false }));
          }, 250);
        }, 5000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [isPlaying, toolsData]);

  const handlePrevImage = (toolId) => {
    const tool = toolsData.find(t => t.id === toolId);
    setImageTransition(prev => ({ ...prev, [toolId]: true }));
    setTimeout(() => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [toolId]: prev[toolId] === 0 ? tool.images.length - 1 : prev[toolId] - 1
      }));
      setImageTransition(prev => ({ ...prev, [toolId]: false }));
    }, 250);
  };

  const handleNextImage = (toolId) => {
    const tool = toolsData.find(t => t.id === toolId);
    setImageTransition(prev => ({ ...prev, [toolId]: true }));
    setTimeout(() => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [toolId]: (prev[toolId] + 1) % tool.images.length
      }));
      setImageTransition(prev => ({ ...prev, [toolId]: false }));
    }, 250);
  };

  const togglePlayPause = (toolId) => {
    setIsPlaying(prev => ({
      ...prev,
      [toolId]: !prev[toolId]
    }));
  };

  const openModal = (images, currentIndex, toolId) => {
    setModalData({ images, currentIndex, toolId });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalPrev = () => {
    setModalTransition(true);
    setTimeout(() => {
      setModalData(prev => ({
        ...prev,
        currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
      }));
      setModalTransition(false);
    }, 250);
  };

  const handleModalNext = () => {
    setModalTransition(true);
    setTimeout(() => {
      setModalData(prev => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.images.length
      }));
      setModalTransition(false);
    }, 250);
  };

  return (
    <div className="gallery-container">
      <Carousel slides={slidesGallery} />

      <div className="gallery-main">
        {/* Orbes flotantes 
        <div className="background-effects">
          <div className="floating-element-1"></div>
          <div className="floating-element-2"></div>
          <div className="floating-element-3"></div>
          <div className="floating-element-4"></div>
          <div className="floating-element-5"></div>
          <div className="floating-element-6"></div>
        </div> */}

        <div className="tools-section-wrapper">

          <header className="gallery-header">
            <h1 className="gallery-title">
              Nuestras Herramientas
            </h1>
            <p className="gallery-subtitle">
              En RX Castillo Digital contamos con tecnología avanzada y herramientas de última generación para ofrecer diagnósticos precisos, rápidos y seguros en el área médica.
            </p>
          </header>

          <div className="tool-section">
            <div className="tool-image-container">
              <div className="tool-image-wrapper">
                <div className="tool-image-background">
                  <img
                    src={toolsData[0].images[currentImageIndex[toolsData[0].id] || 0]}
                    alt={toolsData[0].title}
                    className={`tool-image ${imageTransition[toolsData[0].id] ? 'tool-image-transitioning' : ''}`}
                    onClick={() => openModal(toolsData[0].images, currentImageIndex[toolsData[0].id] || 0, toolsData[0].id)}
                  />
                </div>
              </div>
            </div>

            <div className="tool-content">
              <h2 className="tool-title">
                {toolsData[0].title}
              </h2>
              <p className="tool-description">
                {toolsData[0].description}
              </p>
            </div>
          </div>

          <div className="tool-section tool-section-reverse">
            <div className="tool-image-container">
              <div className="tool-image-wrapper">
                <div className="tool-image-background">
                  <img
                    src={toolsData[1].images[currentImageIndex[toolsData[1].id] || 0]}
                    alt={toolsData[1].title}
                    className={`tool-image ${imageTransition[toolsData[1].id] ? 'tool-image-transitioning' : ''}`}
                    onClick={() => openModal(toolsData[1].images, currentImageIndex[toolsData[1].id] || 0, toolsData[1].id)}
                  />
                </div>
              </div>
            </div>

            <div className="tool-content">
              <h2 className="tool-title">
                {toolsData[1].title}
              </h2>
              <p className="tool-description">
                {toolsData[1].description}
              </p>
            </div>
          </div>

          <div className="tool-section">
            <div className="tool-image-container">
              <div className="tool-image-wrapper">
                <div className="tool-image-background">
                  <img
                    src={toolsData[2].images[currentImageIndex[toolsData[2].id] || 0]}
                    alt={toolsData[2].title}
                    className={`tool-image ${imageTransition[toolsData[2].id] ? 'tool-image-transitioning' : ''}`}
                    onClick={() => openModal(toolsData[2].images, currentImageIndex[toolsData[2].id] || 0, toolsData[2].id)}
                  />
                </div>
              </div>
            </div>

            <div className="tool-content">
              <h2 className="tool-title">
                {toolsData[2].title}
              </h2>
              <p className="tool-description">
                {toolsData[2].description}
              </p>
            </div>
          </div>
        </div>

        <div className="memories-section">
          <header className="memories-header">
            <h2 className="memories-title">
              Recuerdos Digitales
            </h2>
            <p className="memories-subtitle">
              Nos encanta guardar nuestros momentos más especiales y compartir la calidez humana que existe detrás de cada procedimiento. Cada imagen cuenta una historia de cuidado, profesionalismo y dedicación hacia nuestros pacientes, reflejando el ambiente acogedor y familiar que caracteriza a RX Castillo Digital.
            </p>
          </header>

          <div
            className="memories-carousel-container"
            onMouseEnter={() => setMemoriesCarouselPaused(true)}
            onMouseLeave={() => setMemoriesCarouselPaused(false)}
          >
            <div className="memories-carousel-track">
              {/* Primera copia de las imágenes */}
              {memoriesImages.map((image, index) => (
                <div key={`original-${index}`} className="memory-carousel-item">
                  <img
                    src={image}
                    alt={`Recuerdo digital ${index + 1}`}
                    className="memory-carousel-image"
                    onClick={() => openModal(memoriesImages, index, 'memories')}
                  />
                </div>
              ))}
              {/* Segunda copia para loop infinito */}
              {memoriesImages.map((image, index) => (
                <div key={`duplicate-${index}`} className="memory-carousel-item">
                  <img
                    src={image}
                    alt={`Recuerdo digital ${index + 1}`}
                    className="memory-carousel-image"
                    onClick={() => openModal(memoriesImages, index, 'memories')}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {modalOpen && (
          <>
            <button
              className="modal-close-button"
              onClick={closeModal}
            >
              ×
            </button>
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button
                  className="modal-nav-button modal-nav-button-prev"
                  onClick={handleModalPrev}
                >
                  <ChevronLeft size={36} />
                </button>

                <div className="modal-image-container">
                  <div className="modal-image-wrapper">
                    <img
                      src={modalData.images[modalData.currentIndex]}
                      alt="Imagen ampliada"
                      className={`modal-image ${modalTransition ? 'modal-image-transitioning' : ''}`}
                    />
                  </div>
                </div>

                <button
                  className="modal-nav-button modal-nav-button-next"
                  onClick={handleModalNext}
                >
                  <ChevronRight size={36} />
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Gallery;