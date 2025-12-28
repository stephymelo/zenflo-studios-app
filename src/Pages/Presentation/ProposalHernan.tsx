import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import roga from '../../Assets/Proposol/roga-ear.png';
import yoga from '../../Assets/Proposol/yoga-girl.jpg';
import moodboard from '../../Assets/Proposol/moodboard.jpg';
import social from '../../Assets/Proposol/social-mock.jpg';
import './_proposalhernan.scss';


interface ChartData {
    label: string;
    percentage: number;
    color: string;
}

interface StepCard {
    number: number;
    title: string;
    timeScope: string;
    description: string;
}

interface ServiceOption {
    id: string;
    label: string;
    estimateRate: string;
    steps: StepCard[];
}

const ProposalHernan = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState("market-research");
    const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean; canScrollRight: boolean } }>({});
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const chartRef = useRef<HTMLDivElement>(null);
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const t = {
        hero: {
            title: "Hola Hern�n",
            subtitle: "Somos Zenflo, continuen para ver lo que encontramos sobre ustedes."
        },
        whatItIs: {
            title: "Qu� es",
            subtitle: "Una breve descripci�n de tu producto o servicio.",
            text: "Texto descriptivo aqu�."
        },
        overview: {
            title: "Vista general",
            text: "Descripci�n general"
        },
        whatElse: {
            title: "�Qu� m�s encontramos?",
            text: "Informaci�n adicional sobre el an�lisis realizado."
        },
        actualData: {
            title: "Algunos datos reales",
            text1: "Datos de tr�fico y m�tricas:",
            text2: "Palabras clave principales"
        },
        traffic: {
            title: "Tr�fico en el sitio"
        },
        assessment: {
            title: "Evaluaci�n r�pida",
            text1: "Punto de evaluaci�n 1.",
            text2: "Punto de evaluaci�n 2.",
            text3: "Punto de evaluaci�n 3.",
            text4: "Punto de evaluaci�n 4."
        },
        exploration: {
            title: "Exploraci�n",
            subtitle: "Hicimos una mini exploraci�n de su apariencia y estilo."
        },
        gameplanIntro: {
            title: "El plan",
            subtitle: "Queremos que el mundo conozca el valor de su producto, y eso significa empezar con lo b�sico. Aqu� hay algunas cosas con las que podemos comenzar."
        },
        brandIdentity: {
            title: "Entendiendo su producto y mercado",
            text: "Comenzamos investigando el mercado y entendiendo su audiencia ideal."
        },
        market: {
            title: "Definiendo su apariencia y estilo",
            text: "Llevamos la identidad de su producto a sus redes sociales para una presencia de marca consistente."
        },
        gameplan: {
            title: "Creaci�n de contenido y campa�a",
            text: "Programamos una campa�a y organizamos todos los activos necesarios."
        },
        marketSection: {
            title: "Mercado seg�n nuestra breve charla",
            text: "Descripci�n del mercado objetivo"
        },
        servicesHeader: {
            title: "El Flo",
            subtitle: "Hacemos que cada proyecto sea libre de dificultades, para que puedas mantenerte en tu modo zen."
        },
        estimateRate: "Tarifa estimada del proyecto:",
        results: {
            title: "Resultados",
            subtitle: "Para nosotros es importante que vean los resultados.",
            text: "Por eso trabajamos por proyecto y no por tiempo. Queremos que tengan un servicio excelente, eso significa que pueden contactarnos todos los d�as de la semana en cualquier momento."
        },
        nextSteps: {
            title: "Pr�ximos pasos",
            subtitle: "Pong�monos en contacto y empecemos a crear juntos."
        }
    };

    const chartData: ChartData[] = [
        { label: "direct", percentage: 79.71, color: "#49D3BA" },
        { label: "search", percentage: 6.82, color: "#55a4a4ff" },
        { label: "social", percentage: 6.82, color: "#ff9580ff" },
        { label: "referrals", percentage: 5.11, color: "#5A9B7D" },
        { label: "paidReferrals", percentage: 1.48, color: "#E89B7C" },
        { label: "mail", percentage: 0.06, color: "#3eb367ff" },
    ];

    const serviceOptions: ServiceOption[] = [
        {
            id: "market-research",
            label: "Investigaci�n de Mercado",
            estimateRate: "$1,500 - $2,000",
            steps: [
                {
                    number: 1,
                    title: "An�lisis de Producto y Competencia",
                    timeScope: "Semana 1",
                    description: "Conocemos tu producto a fondo: tu misi�n, visi�n y lo que impulsa tus objetivos. Luego exploramos a tus competidores para descubrir oportunidades y posicionar tu marca estrat�gicamente en el mercado.",
                },
                {
                    number: 2,
                    title: "P�blico Objetivo y Buyer Persona",
                    timeScope: "Semana 1",
                    description: "Creamos buyer personas detalladosal menos tres, con un persona clavebasados en la demograf�a, psicograf�a y patrones de comportamiento de tu audiencia."
                },
                {
                    number: 3,
                    title: "An�lisis de Tendencias del Mercado",
                    timeScope: "Semana 2",
                    description: "Realizamos una investigaci�n de mercado profunda para obtener claridad sobre el panorama y definir la forma m�s efectiva de comercializar."
                },
                {
                    number: 4,
                    title: "An�lisis FODA",
                    timeScope: "Semana 2",
                    description: "Realizamos un an�lisis FODA completo para identificar fortalezas, debilidades, oportunidades y amenazas, construyendo una base clara para decisiones estrat�gicas."
                }
            ]
        },
        {
            id: "brand-guidelines",
            label: "Gu�a de Marca",
            estimateRate: "$2,500 - $3,000",
            steps: [
                {
                    number: 1,
                    title: "Identidad de Marca",
                    timeScope: "Semana 1-2",
                    description: "Trabajamos estrechamente con ustedes para dar forma a su marca, honrando su visi�n y aline�ndolo con los est�ndares del mercado. Establecemos la identidad visual de su marca."
                },
                {
                    number: 2,
                    title: "Definici�n de Voz y Tono",
                    timeScope: "Semana 2",
                    description: "C�mo comunican su marca importa. Dise�amos una gu�a detallada que mapea sus puntos de contacto e interacciones. Esto tambi�n incluye un peque�o banco de palabras clave SEO."
                },
                {
                    number: 3,
                    title: "Aplicaciones de Identidad Visual",
                    timeScope: "Semana 3-4",
                    description: "Demostramos c�mo adaptar sus activos visuales en diferentes medios, desde publicaciones sociales hasta correos electr�nicos."
                },
                {
                    number: 4,
                    title: "Dise�o para Redes Sociales",
                    timeScope: "Semana 4-5",
                    description: "Creamos un conjunto de reglas de dise�o para publicaciones sociales, delineando estilo, tipograf�a, uso de color y tratamiento de im�genes."
                }
            ]
        },
        {
            id: "social-media",
            label: "Campa�a de Redes Sociales",
            estimateRate: "$6,000 - $8,000",
            steps: [
                {
                    number: 1,
                    title: "Planificaci�n de Estrategia de Contenido",
                    timeScope: "Semana 1",
                    description: "Creamos un calendario de contenido para una campa�a de 3 meses. Delineamos los objetivos de la campa�a y realizamos el brief para tener los assets necesarios."
                },
                {
                    number: 2,
                    title: "Creaci�n de Contenido",
                    timeScope: "Semana 2-3",
                    description: "Producimos fotos y videos de alta calidad utilizando tanto recursos internos como externos con nuestros propios modelos."
                },
                {
                    number: 3,
                    title: "Campa�a",
                    timeScope: "Semana 4",
                    description: "Lanzamos la campa�a en Instagram y Tiktok, creando y editando activos continuamente."
                },
                {
                    number: 4,
                    title: "Seguimiento de Rendimiento",
                    timeScope: "Continuo",
                    description: "Monitoreamos anal�ticas y m�tricas de engagement, ajustando estrategias bas�ndonos en datos de rendimiento. Enviamos un reporte quincenal."
                }
            ]
        }
    ];

    const checkScrollPosition = (id: string) => {
        const ref = carouselRefs.current[id];
        if (!ref) return;

        const canScrollLeft = ref.scrollLeft > 0;
        const canScrollRight = ref.scrollLeft < (ref.scrollWidth - ref.clientWidth - 1);

        setScrollStates(prev => ({
            ...prev,
            [id]: { canScrollLeft, canScrollRight }
        }));
    };

    const handleScroll = (ref: HTMLDivElement | null, direction: 'left' | 'right', id: string) => {
        if (!ref) return;
        const scrollAmount = ref.offsetWidth * 0.8;
        ref.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });

        // Update scroll state after scrolling
        setTimeout(() => checkScrollPosition(id), 300);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => {
            if (chartRef.current) {
                observer.unobserve(chartRef.current);
            }
        };
    }, []);

    // Initialize scroll states when carousels are mounted
    useEffect(() => {
        serviceOptions.forEach(option => {
            checkScrollPosition(option.id);
        });
    }, [selectedTab]);

    // Add scroll event listeners to carousels
    useEffect(() => {
        const handleScrollEvent = (id: string) => () => checkScrollPosition(id);
        const listeners: { [key: string]: () => void } = {};

        serviceOptions.forEach(option => {
            const ref = carouselRefs.current[option.id];
            if (ref) {
                const listener = handleScrollEvent(option.id);
                listeners[option.id] = listener;
                ref.addEventListener('scroll', listener);
            }
        });

        return () => {
            serviceOptions.forEach(option => {
                const ref = carouselRefs.current[option.id];
                if (ref && listeners[option.id]) {
                    ref.removeEventListener('scroll', listeners[option.id]);
                }
            });
        };
    }, [selectedTab]);

    // Scroll animation observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;
                    const sectionId = target.dataset.sectionId;

                    if (sectionId) {
                        if (entry.isIntersecting) {
                            setVisibleSections(prev => new Set(prev).add(sectionId));
                        } else {
                            setVisibleSections(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(sectionId);
                                return newSet;
                            });
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        Object.values(sectionRefs.current).forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            Object.values(sectionRefs.current).forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    // Calculate cumulative percentages for positioning segments
    const getSegments = () => {
        let cumulative = 0;
        return chartData.map((item) => {
            const start = cumulative;
            cumulative += item.percentage;
            return {
                ...item,
                start,
                end: cumulative,
            };
        });
    };

    const segments = getSegments();

    // Create SVG path for donut segment
    const createArc = (startPercent: number, endPercent: number) => {
        const startAngle = (startPercent / 100) * 360 - 90;
        const endAngle = (endPercent / 100) * 360 - 90;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const outerRadius = 45;
        const innerRadius = 30;
        const centerX = 50;
        const centerY = 50;

        const x1 = centerX + outerRadius * Math.cos(startRad);
        const y1 = centerY + outerRadius * Math.sin(startRad);
        const x2 = centerX + outerRadius * Math.cos(endRad);
        const y2 = centerY + outerRadius * Math.sin(endRad);
        const x3 = centerX + innerRadius * Math.cos(endRad);
        const y3 = centerY + innerRadius * Math.sin(endRad);
        const x4 = centerX + innerRadius * Math.cos(startRad);
        const y4 = centerY + innerRadius * Math.sin(startRad);

        const largeArc = endPercent - startPercent > 50 ? 1 : 0;

        return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
    };

    return (
        <div className="proposal">
            <div className="proposal__container">
                <div className="proposal__logo">
                    <img className="proposal__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                <div
                    className={`proposal__hero ${visibleSections.has('hero') ? 'proposal__hero--visible' : ''}`}
                    data-section-id="hero"
                    ref={(el) => (sectionRefs.current['hero'] = el)}
                >
                    <h1 className="proposal__hero-title">{t.hero.title}</h1>
                    <h3 className="proposal__hero-subtitle">{t.hero.subtitle}</h3>
                </div>

                <div
                    className={`proposal__section ${visibleSections.has('what-it-is') ? 'proposal__section--visible' : ''}`}
                    data-section-id="what-it-is"
                    ref={(el) => (sectionRefs.current['what-it-is'] = el)}
                >
                    <h4 className="proposal__section-subheading">{t.whatItIs.title}</h4>
                    <h2 className="proposal__section-subtitle">{t.whatItIs.subtitle}</h2>
                    <p className="proposal__section-text">{t.whatItIs.text}</p>
                </div>
                <section className="proposal__image">
                    <img className="proposal__image-bg" src={roga} alt="Producto" />
                    <div className="proposal__image-overlay"></div>
                    <div className="proposal__image-content">
                        <h4>{t.overview.title}</h4>
                        <h2 className="proposal__image-content-text">{t.overview.text}</h2>
                    </div>
                </section>

                <div
                    className={`proposal__section ${visibleSections.has('what-else') ? 'proposal__section--visible' : ''}`}
                    data-section-id="what-else"
                    ref={(el) => (sectionRefs.current['what-else'] = el)}
                >
                    <h4 className="proposal__section-subheading">{t.whatElse.title}</h4>
                    <p className="proposal__section-text">{t.whatElse.text}</p>
                </div>



                <div
                    className={`proposal__section ${visibleSections.has('traffic') ? 'proposal__section--visible' : ''}`}
                    data-section-id="traffic"
                    ref={(el) => (sectionRefs.current['traffic'] = el)}
                >
                     <div
                    className={`proposal__section ${visibleSections.has('actual-data') ? 'proposal__section--visible' : ''}`}
                    data-section-id="actual-data"
                    ref={(el) => (sectionRefs.current['actual-data'] = el)}
                >
                    <h4 className="proposal__section-subheading">{t.actualData.title}</h4>
                    <p className="proposal__section-text">{t.actualData.text1}</p>
                    <p className="proposal__section-text">{t.actualData.text2}</p>
                </div>

                    <div className="proposal__chart" ref={chartRef}>
                         <p className="proposal__section-text">{t.traffic.title}</p>
                        <div className="proposal__chart-container">
                            <div className="proposal__chart-wrapper">
                                <svg viewBox="0 0 100 100" className="proposal__chart-svg">
                                    {segments.map((segment, index) => (
                                        <path
                                            key={segment.label}
                                            d={createArc(segment.start, segment.end)}
                                            fill={segment.color}
                                            className={`proposal__chart-segment ${isVisible ? "proposal__chart-segment--animate" : ""}`}
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                            }}
                                        />
                                    ))}
                                </svg>
                            </div>

                            <div className="proposal__chart-legend">
                                {chartData.map((item, index) => (
                                    <div
                                        key={item.label}
                                        className={`proposal__legend-item ${isVisible ? "proposal__legend-item--fade-in" : ""}`}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        <div className="proposal__legend-color" style={{ backgroundColor: item.color }} />
                                        <span className="proposal__legend-label">{item.label}:</span>
                                        <span className="proposal__legend-percentage">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                   <div
                        className={`proposal__section ${visibleSections.has('assessment') ? 'proposal__section--visible' : ''}`}
                        data-section-id="assessment"
                        ref={(el) => (sectionRefs.current['assessment'] = el)}
                    >
                        <h4 className="proposal__section-subheading">{t.assessment.title}</h4>
                        <div className="proposal__section-bullet-item">
                            <span className="proposal__section-bullet"></span>
                            <p className="proposal__section-text">{t.assessment.text1}</p>
                        </div>
                        <div className="proposal__section-bullet-item">
                            <span className="proposal__section-bullet"></span>
                            <p className="proposal__section-text">{t.assessment.text2}</p>
                        </div>
                        <div className="proposal__section-bullet-item">
                            <span className="proposal__section-bullet"></span>
                            <p className="proposal__section-text">{t.assessment.text3}</p>
                        </div>
                            <div className="proposal__section-bullet-item">
                            <span className="proposal__section-bullet"></span>
                            <p className="proposal__section-text">{t.assessment.text4}</p>
                        </div>
                    </div>

                    {/* Exploration Section */}
                    <div
                        className={`proposal__section ${visibleSections.has('exploration') ? 'proposal__section--visible' : ''}`}
                        data-section-id="exploration"
                        ref={(el) => (sectionRefs.current['exploration'] = el)}
                    >
                        <h4 className="proposal__section-subheading">{t.exploration.title}</h4>
                        <h2 className="proposal__section-subtitle">{t.exploration.subtitle}</h2>
                        <div className="proposal__exploration-images">
                            <div className="proposal__exploration-image">
                                <img src={moodboard} alt="Moodboard exploration" className="proposal__section-img" />
                            </div>
                            <div className="proposal__exploration-image">
                                <img src={social} alt="Social media exploration" className="proposal__section-img" />
                            </div>
                        </div>
                    </div>

                <section className="proposal__section-main">



                    <div
                        className={`proposal__section ${visibleSections.has('gameplan-intro') ? 'proposal__section--visible' : ''}`}
                        data-section-id="gameplan-intro"
                        ref={(el) => (sectionRefs.current['gameplan-intro'] = el)}
                    >
                        <h4 className="proposal__section-subheading">{t.gameplanIntro.title}</h4>
                        <h2 className="proposal__section-subtitle">{t.gameplanIntro.subtitle}</h2>
                    </div>

                    <div
                        className={`proposal__section-line ${visibleSections.has('brand-identity') ? 'proposal__section-line--visible' : ''}`}
                        data-section-id="brand-identity"
                        ref={(el) => (sectionRefs.current['brand-identity'] = el)}
                    >
                        <h3 className="proposal__section-line-title">{t.brandIdentity.title}</h3>
                        <p className="proposal__section-line-text">{t.brandIdentity.text}</p>
                    </div>

                    <div
                        className={`proposal__section-line ${visibleSections.has('market') ? 'proposal__section-line--visible' : ''}`}
                        data-section-id="market"
                        ref={(el) => (sectionRefs.current['market'] = el)}
                    >
                        <h3 className="proposal__section-line-title">{t.market.title}</h3>
                        <p className="proposal__section-line-text">{t.market.text}</p>
                    </div>

                    <div
                        className={`proposal__section-line ${visibleSections.has('gameplan') ? 'proposal__section-line--visible' : ''}`}
                        data-section-id="gameplan"
                        ref={(el) => (sectionRefs.current['gameplan'] = el)}
                    >
                        <h3 className="proposal__section-line-title">{t.gameplan.title}</h3>
                        <p className="proposal__section-line-text">{t.gameplan.text}</p>
                    </div>

                </section>

                {/* Hero Image Section with Overlay */}
                <section className="proposal__image">
                    <img className="proposal__image-bg" src={yoga} alt="Imagen de marca" />
                    <div className="proposal__image-overlay"></div>
                    <div className="proposal__image-content">
                        <h4>{t.marketSection.title}</h4>
                        <h2 className="proposal__image-content-text">{t.marketSection.text}</h2>
                    </div>
                </section>

                {/* Services Carousel Section */}
                <section className="proposal__services">
                    <div
                        className={`proposal__services-header ${visibleSections.has('services-header') ? 'proposal__services-header--visible' : ''}`}
                        data-section-id="services-header"
                        ref={(el) => (sectionRefs.current['services-header'] = el)}
                    >
                        <h4 className="proposal__section-subheading">{t.servicesHeader.title}</h4>
                        <h2 className="proposal__section-subtitle">{t.servicesHeader.subtitle}</h2>
                    </div>

                    {/* Tabs */}
                    <div className="proposal__tabs">
                        {serviceOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`proposal__tab ${selectedTab === option.id ? 'proposal__tab--active' : ''}`}
                                onClick={() => setSelectedTab(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* Project Estimate Rate */}
                    <p className="proposal__estimate-rate">
                        {t.estimateRate} {serviceOptions.find(option => option.id === selectedTab)?.estimateRate}
                    </p>

                    {/* Carousel for each tab */}
                    <div className="proposal__carousel-container">
                        {serviceOptions.map((option) => (
                            <div key={option.id}>
                                <div
                                    className={`proposal__carousel-wrapper ${selectedTab === option.id ? 'proposal__carousel-wrapper--active' : ''}`}
                                >
                                    <button
                                        className="proposal__carousel-arrow proposal__carousel-arrow--left"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                        aria-label="Scroll left"
                                    >
                                        <IconChevronLeft size={20} />
                                    </button>

                                    <div
                                        className="proposal__carousel"
                                        ref={(el) => (carouselRefs.current[option.id] = el)}
                                    >
                                        {option.steps.map((step) => (
                                            <div key={step.number} className="proposal__card">
                                                <div className="proposal__card-number">
                                                    <span className="proposal__card-number-text">{step.number}</span>
                                                </div>
                                                <h3 className="proposal__card-title">{step.title}</h3>
                                                <p className="proposal__card-time">{step.timeScope}</p>
                                                <p className="proposal__card-description">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="proposal__carousel-arrow proposal__carousel-arrow--right"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'right', option.id)}
                                        aria-label="Scroll right"
                                    >
                                        <IconChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Bottom navigation indicators */}
                                {selectedTab === option.id && (
                                    <div className="proposal__carousel-nav">
                                        <button
                                            className={`proposal__carousel-nav-button ${!scrollStates[option.id]?.canScrollLeft ? 'proposal__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                            disabled={!scrollStates[option.id]?.canScrollLeft}
                                            aria-label="Scroll left"
                                        >
                                            <IconChevronLeft size={20} />
                                        </button>
                                        <button
                                            className={`proposal__carousel-nav-button ${!scrollStates[option.id]?.canScrollRight ? 'proposal__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[option.id], 'right', option.id)}
                                            disabled={!scrollStates[option.id]?.canScrollRight}
                                            aria-label="Scroll right"
                                        >
                                            <IconChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                <div
                    className={`proposal__section ${visibleSections.has('results') ? 'proposal__section--visible' : ''}`}
                    data-section-id="results"
                    ref={(el) => (sectionRefs.current['results'] = el)}
                >
                    <h4 className="proposal__section-subheading">{t.results.title}</h4>
                    <h2 className="proposal__section-subtitle">{t.results.subtitle}</h2>
                    <p className="proposal__section-text">{t.results.text}</p>
                </div>

                <div
                    className={`proposal__section ${visibleSections.has('next-steps') ? 'proposal__section--visible' : ''}`}
                    data-section-id="next-steps"
                    ref={(el) => (sectionRefs.current['next-steps'] = el)}
                >
                    <h4 className="proposal__section-subheading">{t.nextSteps.title}</h4>
                    <h2 className="proposal__section-subtitle">{t.nextSteps.subtitle}</h2>
                    <div className="proposal__section-links">
                        <a
                            href="tel:+19085604930"
                            className="contact__email-button"
                        >
                            +1 908-560-4930
                        </a>{" "}
                        <a
                            href="mailto:hello@zenflostudios.com"
                            className="contact__email-button"
                        >
                            hello@zenflostudios.com
                        </a>{" "}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProposalHernan;
