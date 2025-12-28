import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import roga from '../../Assets/Proposol/roga-ear.png';
import yoga from '../../Assets/Proposol/yoga-girl.jpg';
import moodboard from '../../Assets/Proposol/moodboard.jpg';
import social from '../../Assets/Proposol/social-mock.jpg';
import './_proposalallinoneinventions.scss';


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

const ProposalAllinoneinventions = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState("seo-social-assessment");
    const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean; canScrollRight: boolean } }>({});
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [language, setLanguage] = useState<'ES' | 'EN'>('EN');
    const chartRef = useRef<HTMLDivElement>(null);
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const translations = {
        ES: {
            hero: {
                title: "Hola All In One Inventions",
                subtitle: "Somos Zenflo, continuen para ver lo que encontramos sobre ustedes."
            },
            whatItIs: {
                title: "Qué es",
                subtitle: "All In One Inventions es un dispositivo que estimula el nervio vago para ayudar a manejar el estrés, aliviar el sueño e incluso mejorar la concentración.",
                text: "Es fácil de usar y tiene una app que controla el dispositivo y ofrece diferentes contenidos de meditación."
            },
            overview: {
                title: "Vista general",
                text: "Ligero, 3 colores, plug and play"
            },
            whatElse: {
                title: "¿Qué más encontramos?",
                text: "Su tienda está construida en Shopify, ¡eso es genial! Shopify ofrece herramientas poderosas para conectar y optimizar leads desde redes sociales y motores de búsqueda. Además de facilitar el email marketing a través de su sistema integrado o integraciones como Mailchimp."
            },
            actualData: {
                title: "Algunos datos reales",
                text1: "Vimos que tuveron aproximadamente 2k visitas este último mes. Sus palabras clave fueron:",
                text2: '"All In One Inventions startup" y "All In One Inventions"'
            },
            traffic: {
                title: "Tráfico en el sitio"
            },
            assessment: {
                title: "Evaluación rápida",
                text1: "Falta de consistencia entre la apariencia del sitio web y las redes sociales.",
                text2: "La interacción en TikTok es limitada pero muestra un alcance más alto, mientras que en Instagram la interacción suele ser más constante.",
                text3: "El contenido debe ser auténtico. Las personas quieren contenido que les genere valor y muestre cómo se integra en la vida diaria.",
                text4: "El contenido más atractivo muestra personas reales usando el producto. Las marcas de bienestar participan en tendencias, usan testimonios, y crean contenido relevante a la industria."
            },
            exploration: {
                title: "Exploración",
                subtitle: "Hicimos una mini exploración de su apariencia y estilo."
            },
            gameplanIntro: {
                title: "El plan",
                subtitle: "Queremos que el mundo conozca el valor de su producto, y eso significa empezar con lo básico. Aquí hay algunas cosas con las que podemos comenzar."
            },
            brandIdentity: {
                title: "Entendiendo su producto y mercado",
                text: "Comenzamos investigando el mercado y entendiendo su audiencia ideal: aquellos que valoran un estilo de vida libre de estrés. Usando esta información, construimos un buyer persona, realizamos un análisis FODA y desarrollamos un banco de palabras clave SEO para guiar tu estrategia."
            },
            market: {
                title: "Definiendo su apariencia y estilo",
                text: "Llevamos la identidad de su producto, empaque y sitio web a sus redes sociales para una presencia de marca consistente."
            },
            gameplan: {
                title: "Creación de contenido y campaña",
                text: "Programamos una campaña de 3 meses y organizamos todos los activos necesarios, incluyendo fotografía de producto, imágenes de modelos y videos."
            },
            marketSection: {
                title: "Mercado según nuestra breve charla",
                text: "Mujeres de 30 a 40 años que se preocupan por su bienestar y desean vivir sin estrés"
            },
            servicesHeader: {
                title: "El Flo",
                subtitle: "Hacemos que cada proyecto sea libre de dificultades, para que puedas mantenerte en tu modo zen."
            },
            estimateRate: "Tarifa estimada del proyecto:",
            results: {
                title: "Resultados",
                subtitle: "Para nosotros es importante que vean los resultados.",
                text: "Por eso trabajamos por proyecto y no por tiempo. Queremos que tengan un servicio excelente, eso significa que pueden contactarnos todos los días de la semana en cualquier momento."
            },
            nextSteps: {
                title: "Próximos pasos",
                subtitle: "Pongámonos en contacto y empecemos a crear juntos."
            }
        },
        EN: {
            hero: {
                title: "Hey there All In One Inventions",
                subtitle: "We are Zenflo, keep scrolling down to see what we found about you."
            },
            whatItIs: {
                title: "What it is",
                subtitle: "All In One Inventions offer invention services to help people create, patent and launch their own digital or physical product.",
                text: "There are various services ranging from design and marketing to prototyping and app development ."
            },
            overview: {
                title: "Overview",
                text: "From idea to licensing for entrepreneurs"
            },
            whatElse: {
                title: "What else did we find?",
                text: "We found that you currently use Google Ads and Microsoft Advertising to have sponsorship in Google. We also found a facebook account for your social media presence."
            },
            actualData: {
                title: "Some actual data",
                text1: "We saw that you had approximately 10.3k visits this for the month of November. Your top keywords were:",
                text2: '"invention, ideas, patent, idea invention, inventory resources"'
            },
            traffic: {
                title: "Traffic on your site"
            },
            assessment: {
                title: "Quick assessment",
                text1: "Lack of social media presence",
                text2: "Contact page and Get Started are lacking key questions to know who is contacting you and what they need when you give them a call back. People are willing to give more information if they are interested in your services.",
                text3: "Traffic source from organic search is low with 28% of your total traffic.",
                text4: "Depending on how you search for All in One Inventions, Google search shows competitors positioned before your site (excluding the sponsored result)"
            },
            exploration: {
                title: "Exploration",
                subtitle: "We did a mini exploration of your look and feel."
            },
            gameplanIntro: {
                title: "The game plan",
                subtitle: "We want to increase your presence in Florida and in the U.S.A, expanding your cliente base, and that means starting with the basics. Here are some the things we can start off with."
            },
            brandIdentity: {
                title: "Understanding your product and market",
                text: "We start by researching the market and understanding your ideal audience—those who value are entrepreneurs and product development. Using this insight, we build a buyer persona, conduct a SWOT analysis, and develop an SEO keyword bank to guide your strategy."
            },
            market: {
                title: "SEO Website & Social Media Presence",
                text: "We build an SEO foundation, identify website improvements, and provide social media templates to ensure consistent brand presence."
            },
            gameplan: {
                title: "Content creation and campaign",
                text: "We plan a one-month blog campaign and a three-month social media campaign, including written blog content and a list of future topics for continued growth."
            },
            marketSection: {
                title: "Market from our brief chat",
                text: "Women in their 30's-40's who care about their well-being and wish to live stress-free"
            },
            servicesHeader: {
                title: "The Flo",
                subtitle: "We make every project hassle-free, so you can stay in your zen mode."
            },
            estimateRate: "Project estimate rate:",
            results: {
                title: "Results",
                subtitle: "For us it's important you actually see the results.",
                text: "We tackle things based on the project, not on how much time we spend doing it. We want you to have an excellent service, that means you can talk to us every day of the week at anytime."
            },
            nextSteps: {
                title: "Next Steps",
                subtitle: "Let's get in touch and start creating together."
            }
        }
    };

    const t = translations[language];

    const chartData: ChartData[] = [
        { label: "direct", percentage: 46.52, color: "#49D3BA" },
        { label: "search", percentage: 28.88, color: "#ff9580ff" },
        { label: "social", percentage: 16.98, color: "#a78bfa" },
        { label: "referrals", percentage: 6.05, color: "#5A9B7D" },
        { label: "paidReferrals", percentage: 1.48, color: "#9AE6B4" },
        { label: "mail", percentage: 0.10, color: "#ff7f50" },
    ];

    const visitsData = [
        { date: "2025/09", visits: 13000 },
        { date: "2025/10", visits: 10000 },
        { date: "2025/11", visits: 10200 },
    ];

    const serviceOptionsData = {
        ES: [
            {
                id: "seo-social-assessment",
                label: "Evaluación de SEO, Sitio Web y Redes Sociales",
                estimateRate: "$1,500 - $1,800",
                steps: [
                    {
                        number: 1,
                        title: "Auditoría Completa de SEO del Sitio Web",
                        timeScope: "",
                        description: "Vemos cómo está funcionando tu sitio web, las palabras clave y qué mejoras podemos hacer para búsquedas orgánicas y pagadas. Visión general de competidores y mercado (benchmarks de la industria)."
                    },
                    {
                        number: 2,
                        title: "Evaluación de Redes Sociales",
                        timeScope: "",
                        description: "Análisis de mercado y audiencia (quiénes son tus usuarios y cómo se comportan). Revisión de plataformas actuales, hábitos de publicación y rendimiento del contenido con identificación de oportunidades de crecimiento y vacíos de contenido."
                    },
                    {
                        number: 3,
                        title: "Recomendación de Seguimiento de Leads",
                        timeScope: "",
                        description: "Recomendación estratégica para agregar preguntas personalizadas a los formularios de contacto (ej: '¿Cómo nos conociste?', '¿Qué servicio buscas?'). Objetivo: entender mejor las fuentes de leads, la intención del usuario y el ROI de marketing."
                    },
                    {
                        number: 4,
                        title: "Reporte",
                        timeScope: "",
                        description: "Reporte de evaluación claro con hallazgos, insights y prioridades. Recomendaciones accionables para SEO, contenido, sitio web y redes sociales."
                    }
                ]
            },
            {
                id: "content-growth",
                label: "Plan de Optimización, Contenido y Crecimiento en Redes Sociales",
                estimateRate: "$4,000 - $6,000",
                steps: [
                    {
                        number: 1,
                        title: "Optimización del Sitio Web",
                        timeScope: "6-8 semanas",
                        description: "Mejoras de SEO basadas en los hallazgos de la evaluación. Optimización de páginas clave para búsqueda y conversiones. Recomendaciones de estructura de contenido (encabezados, enlaces internos, CTAs). Optimización de página de contacto, incluyendo preguntas de fuentes de leads."
                    },
                    {
                        number: 2,
                        title: "Creación de Contenido Orgánico (Blogs)",
                        timeScope: "6-8 semanas",
                        description: "Investigación de temas de blog alineados con palabras clave e intención del usuario. Creación de contenido de blog optimizado para SEO para crecimiento orgánico. Contenido diseñado para apoyar visibilidad y autoridad a largo plazo."
                    },
                    {
                        number: 3,
                        title: "Estrategia y Planificación de Redes Sociales",
                        timeScope: "6-8 semanas",
                        description: "Plan de publicación en redes sociales (temas de contenido, cadencia, enfoque de plataforma). Ideas de contenido alineadas con comportamiento de audiencia y objetivos de marca. Estrategia enfocada en conciencia, engagement y nutrición de leads."
                    }
                ]
            }
        ],
        EN: [
            {
                id: "seo-social-assessment",
                label: "SEO Website & Social Assessment",
                estimateRate: "$1,500 - $1,800",
                steps: [
                    {
                        number: 1,
                        title: "Full SEO Audit of Website",
                        timeScope: "1 week",
                        description: "Comprehensive review of website performance, keyword visibility, and search opportunities, including competitor and market benchmarks for organic and paid growth."
                    },
                    {
                        number: 2,
                        title: "SEO Foundation & Guidelines",
                        timeScope: "1 week",
                        description: "Creation of an SEO keyword bank with improvement opportunities for the website, plus usage guidelines to maintain a consistent brand presence across social media."
                    },

                    {
                        number: 3,
                        title: "Lead Tracking",
                        timeScope: "",
                        description: "Recommendations for adding custom contact form questions and touchpoints to better track lead sources, user intent, and marketing performance."
                    },
                    {
                        number: 4,
                        title: "Analysis Report",
                        timeScope: "1 week",
                        description: "Data-focused report including SWOT analysis, traffic performance, lead activity, and user interactions across the website and social media."
                    

            }

        ]
    },
        {
            id: "content-growth",
            label: "Optimization, Content & Social Growth Plan",
            estimateRate: "$500 - $600",
            steps: [

                {

                    number: 1,
                    title: "Blog Topics & Examples",
                    timeScope: "2 weeks",
                    description: "Keyword-driven blog topic research focused on inventions, patents, and product creation. Includes 8 SEO-optimized blog topics with examples designed to attract entrepreneurs, inventors, and product-based founders while supporting long-term organic visibility."

                    },
                {
                    number: 2,
                    title: "Social Media Strategy & Planning",
                    timeScope: "2 weeks",
                    description: "Targeted social media strategy to build credibility for an invention or patented solution, with a posting plan, content themes, and post/video ideas tailored to entrepreneurs."

                    }
            ]
        }
        ]
    };

const serviceOptions = serviceOptionsData[language];

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
            {/* <section className="proposal__image">
                    <img className="proposal__image-bg" src={roga} alt="All In One Inventions wellness device" />
                    <div className="proposal__image-overlay"></div>
                    <div className="proposal__image-content">
                        <h4>{t.overview.title}</h4>
                        <h2 className="proposal__image-content-text">{t.overview.text}</h2>
                    </div>
                </section> */}

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

                {/* Visits Over Time Chart */}
                <div className="proposal__visits-chart">
                    <h4 className="proposal__section-subheading">Visits Over Time</h4>
                    <svg viewBox="0 0 800 400" className="proposal__line-chart">
                        {/* Grid lines */}
                        <line x1="100" y1="50" x2="100" y2="350" stroke="#e5e5e5" strokeWidth="2" />
                        <line x1="100" y1="350" x2="750" y2="350" stroke="#e5e5e5" strokeWidth="2" />

                        {/* Horizontal grid lines */}
                        <line x1="100" y1="50" x2="750" y2="50" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="100" y1="125" x2="750" y2="125" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="100" y1="200" x2="750" y2="200" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="100" y1="275" x2="750" y2="275" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="5,5" />

                        {/* Y-axis labels */}
                        <text x="70" y="55" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="600" textAnchor="end">14K</text>
                        <text x="70" y="130" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="600" textAnchor="end">10.5K</text>
                        <text x="70" y="205" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="600" textAnchor="end">7K</text>
                        <text x="70" y="280" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="600" textAnchor="end">3.5K</text>
                        <text x="70" y="355" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="600" textAnchor="end">0</text>

                        {/* X-axis labels */}
                        <text x="200" y="380" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="500" textAnchor="middle">2025/09</text>
                        <text x="425" y="380" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="500" textAnchor="middle">2025/10</text>
                        <text x="650" y="380" fontSize="16" fill="#2d3748" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="500" textAnchor="middle">2025/11</text>

                        {/* Line path */}
                        <polyline
                            points="200,86 425,200 650,193"
                            fill="none"
                            stroke="#49D3BA"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Data points */}
                        <circle cx="200" cy="86" r="6" fill="#49D3BA" />
                        <circle cx="425" cy="200" r="6" fill="#49D3BA" />
                        <circle cx="650" cy="193" r="6" fill="#49D3BA" />
                    </svg>
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

            {/* Exploration Section - HIDDEN */}
            {/* <div
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
                    </div> */}

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

            {/* Hero Image Section with Overlay - HIDDEN */}
            {/* <section className="proposal__image">
                    <img className="proposal__image-bg" src={yoga} alt="All In One Inventions wellness device" />
                    <div className="proposal__image-overlay"></div>
                    <div className="proposal__image-content">
                        <h4>{t.marketSection.title}</h4>
                        <h2 className="proposal__image-content-text">{t.marketSection.text}</h2>
                    </div>
                </section> */}

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

export default ProposalAllinoneinventions;
