import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import roga from '../../Assets/Proposol/roga-ear.png';
import yoga from '../../Assets/Proposol/yoga-girl.jpg';


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

const ProposolRoga = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState("market-research");
    const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean; canScrollRight: boolean } }>({});
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [language, setLanguage] = useState<'ES' | 'EN'>('ES');
    const chartRef = useRef<HTMLDivElement>(null);
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const translations = {
        ES: {
            hero: {
                title: "Hola Roga.ai",
                subtitle: "Somos Zenflo, sigue bajando para ver lo que encontramos sobre ustedes."
            },
            whatItIs: {
                title: "Qué es",
                subtitle: "Roga es un dispositivo que estimula el nervio vago para ayudar a manejar el estrés, mejorar el sueño e incluso ayudarte a concentrarte.",
                text: "Es muy fácil de usar y tiene una app que controla el dispositivo y ofrece diferentes contenidos de meditación."
            },
            overview: {
                title: "Vista general",
                text: "Ligero, 3 colores, plug and play"
            },
            whatElse: {
                title: "¿Qué más encontramos?",
                text: "Tu tienda está construida en Shopify, ¡eso es genial! Shopify ofrece herramientas poderosas para conectar y optimizar leads desde redes sociales y motores de búsqueda, además de flujos de email marketing fluidos a través de su sistema integrado o integraciones como Mailchimp."
            },
            actualData: {
                title: "Algunos datos reales",
                text1: "Vimos que tuviste aproximadamente 2k visitas este último mes. Tus palabras clave principales fueron:",
                text2: '"Roga startup" y "Roga"'
            },
            traffic: {
                title: "Tráfico en tu sitio"
            },
            assessment: {
                title: "Evaluación rápida",
                text1: "Desalineación entre la apariencia del sitio web y las redes sociales.",
                text2: "El engagement en Instagram es limitado, mientras que TikTok demuestra mayor interacción y alcance.",
                text3: "El contenido debe ser auténtico y relacionable. Las audiencias quieren contenido que proporcione valor y muestre cómo se integra en la vida diaria.",
                text4: "El contenido más atractivo muestra personas reales disfrutando y explicando el producto. Las marcas de bienestar exitosas participan en tendencias y demuestran el uso diario."
            },
            gameplanIntro: {
                title: "El plan",
                subtitle: "Queremos que el mundo conozca el valor de tu producto, y eso significa empezar con lo básico. Aquí hay algunas cosas con las que podemos comenzar."
            },
            brandIdentity: {
                title: "Entendiendo tu producto y mercado",
                text: "Comenzamos investigando el mercado y entendiendo tu audiencia ideal: aquellos que valoran un estilo de vida libre de estrés. Usando esta información, construimos un buyer persona, realizamos un análisis FODA y desarrollamos un banco de palabras clave SEO para guiar tu estrategia."
            },
            market: {
                title: "Definiendo tu apariencia y estilo",
                text: "Llevamos la identidad de tu producto, empaque y sitio web a tus canales sociales para una presencia de marca consistente."
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
                subtitle: "Hacemos que cada proyecto sea sin complicaciones, para que puedas mantenerte en tu modo zen."
            },
            estimateRate: "Tarifa estimada del proyecto:",
            results: {
                title: "Resultados",
                subtitle: "Para nosotros es importante que veas los resultados.",
                text: "Abordamos las cosas basándonos en el proyecto, no en cuánto tiempo pasamos haciéndolo, queremos que tengas un servicio excelente, eso significa que puedes hablar con nosotros todos los días de la semana en cualquier momento."
            },
            nextSteps: {
                title: "Próximos pasos",
                subtitle: "Pongámonos en contacto y empecemos a crear juntos."
            }
        },
        EN: {
            hero: {
                title: "Hey there Roga.ai",
                subtitle: "We are Zenflo, keep scrolling down to see what we found about you."
            },
            whatItIs: {
                title: "What it is",
                subtitle: "Roga is a device that stimulates the vagus nerve to help manage stress, improve sleep and even help you focus.",
                text: "It's very easy to use and has an app that controls the device and offers different meditation content."
            },
            overview: {
                title: "Overview",
                text: "Light-weight, 3 colors, plug and play"
            },
            whatElse: {
                title: "What else did we find?",
                text: "Your store is built on Shopify — that's great! Shopify offers powerful tools to connect and streamline leads from social media and search engines, plus seamless email marketing flows through its built-in system or integrations like Mailchimp."
            },
            actualData: {
                title: "Some actual data",
                text1: "We saw that you had approximately 2k visits this last month. Your top keywords were:",
                text2: '"Roga startup" and "Roga"'
            },
            traffic: {
                title: "Traffic on your site"
            },
            assessment: {
                title: "Quick assessment",
                text1: "Misalignment between website look and feel and social media. ",
                text2: "Engagement on Instagram is limited, whereas TikTok demonstrates higher interaction and reach.",
                text3: "Content should be authentic and relatable. Audiences want content that provides value and shows how it fits into daily life.",
                text4: "The most engaging content shows real people enjoying and explaining the product. Successful wellness brands participate in trends and demonstrate daily use."
            },
            gameplanIntro: {
                title: "The game plan",
                subtitle: "We want the world to know the value of your product, and that means starting with the basics. Here are some the things we can start off with."
            },
            brandIdentity: {
                title: "Understanding your product and market",
                text: "We start by researching the market and understanding your ideal audience—those who value a stress-free lifestyle. Using this insight, we build a buyer persona, conduct a SWOT analysis, and develop an SEO keyword bank to guide your strategy."
            },
            market: {
                title: "Defining your look and feel",
                text: "We bring your product, packaging, and website identity into your social channels for a consistent brand presence."
            },
            gameplan: {
                title: "Content creation and campaign",
                text: "We schedule a 3-month campaign and organize all necessary assets, including product photography, model images, and videos."
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
                text: "We tackle things based on the project, not on how much time we spend doing it, we want you to have an excellent service, that means you can talk to us every day of the week at anytime."
            },
            nextSteps: {
                title: "Next Steps",
                subtitle: "Let's get in touch and start creating together."
            }
        }
    };

    const t = translations[language];

    const chartData: ChartData[] = [
        { label: "direct", percentage: 79.71, color: "#49D3BA" },
        { label: "search", percentage: 6.82, color: "#55a4a4ff" },
        { label: "social", percentage: 6.82, color: "#ff9580ff" },
        { label: "referrals", percentage: 5.11, color: "#5A9B7D" },
        { label: "paidReferrals", percentage: 1.48, color: "#E89B7C" },
        { label: "mail", percentage: 0.06, color: "#3eb367ff" },
    ];

    const serviceOptionsData = {
        ES: [
            {
                id: "market-research",
                label: "Investigación de Mercado",
                estimateRate: "$1,000 - $1,500",
                steps: [
                    {
                        number: 1,
                        title: "Análisis de Producto y Competencia",
                        timeScope: "Semana 1",
                        description: "Conocemos tu producto a fondo: tu misión, visión y lo que impulsa tus objetivos. Luego exploramos a tus competidores para descubrir oportunidades y posicionar tu marca estratégicamente en el mercado.",
                    },
                    {
                        number: 2,
                        title: "Público Objetivo y Buyer Persona",
                        timeScope: "Semana 2",
                        description: "Creamos buyer personas detallados—al menos tres, con un persona clave—basados en la demografía, psicografía y patrones de comportamiento de tu audiencia."
                    },
                    {
                        number: 3,
                        title: "Análisis de Tendencias del Mercado",
                        timeScope: "Semana 3-4",
                        description: "Realizamos una investigación de mercado profunda para obtener claridad sobre el panorama del bienestar y definir la forma más efectiva de comercializar Roga."
                    },
                    {
                        number: 4,
                        title: "Análisis FODA",
                        timeScope: "Semana 4",
                        description: "Realizamos un análisis FODA completo para identificar las fortalezas, debilidades, oportunidades y amenazas de Roga, construyendo una base clara para decisiones estratégicas."
                    }
                ]
            },
            {
                id: "brand-guidelines",
                label: "Guías de Marca",
                estimateRate: "$2,000 - $2,500",
                steps: [
                    {
                        number: 1,
                        title: "Identidad de Marca",
                        timeScope: "Semana 1-2",
                        description: "Trabajamos estrechamente contigo para dar forma a tu marca, honrando tu visión, tu producto y alineándolo con los estándares del mercado. Establecemos la identidad visual de tu marca: colores, tipografía y logo, y creamos materiales gráficos que aportan consistencia."
                    },
                    {
                        number: 2,
                        title: "Definición de Voz y Tono",
                        timeScope: "Semana 2-3",
                        description: "Cómo comunicas tu marca importa. Diseñamos una guía detallada que mapea tus puntos de contacto e interacciones de marca. Esto también incluye un pequeño banco de palabras clave SEO para integrar en los textos."
                    },
                    {
                        number: 3,
                        title: "Aplicaciones de Identidad Visual",
                        timeScope: "Semana 3-4",
                        description: "Demostramos cómo adaptar tus activos visuales en diferentes medios, desde publicaciones sociales hasta correos electrónicos, mostrando sus diversas aplicaciones para un uso consistente de la marca."
                    },
                    {
                        number: 4,
                        title: "Diseño para Redes Sociales",
                        timeScope: "Semana 4-5",
                        description: "Creamos un conjunto de reglas de diseño para publicaciones sociales, delineando diseño, tipografía, uso de color y tratamiento de imágenes para asegurar que cada publicación refleje tu marca de manera consistente."
                    }
                ]
            },
            {
                id: "social-media",
                label: "Campaña de Redes Sociales",
                estimateRate: "$6,000 - $8,000",
                steps: [
                    {
                        number: 1,
                        title: "Planificación de Estrategia de Contenido",
                        timeScope: "Semana 1",
                        description: "Creamos un calendario de contenido de 3 meses alineado con tu marca y los intereses de tu audiencia."
                    },
                    {
                        number: 2,
                        title: "Creación de Contenido",
                        timeScope: "Semana 2-6",
                        description: "Producimos fotos y videos de alta calidad utilizando tanto recursos internos como externos con nuestros propios modelos. Luego creamos y editamos los materiales para un uso versátil en todos los canales."
                    },
                    {
                        number: 3,
                        title: "Lanzamiento de Campaña",
                        timeScope: "Semana 4-8",
                        description: "Seguimos el calendario para comenzar a publicar, creando y editando activos continuamente, y lanzamos campañas en Instagram, Facebook y TikTok."
                    },
                    {
                        number: 4,
                        title: "Seguimiento de Rendimiento",
                        timeScope: "Continuo",
                        description: "Monitoreamos analíticas y métricas de engagement, ajustando estrategias basándonos en datos de rendimiento. Un reporte quincenal resume todos los resultados."
                    }
                ]
            }
        ],
        EN: [
            {
                id: "market-research",
                label: "Market Research",
                estimateRate: "$1,000 - $1,500",
                steps: [
                    {
                        number: 1,
                        title: "Product and Competitor Analysis",
                        timeScope: "Week 1",
                        description: "We get to know your product inside out—your mission, vision, and what drives your goals. Then we explore your competitors to uncover opportunities and position your brand strategically in the market.",
                    },
                    {
                        number: 2,
                        title: "Target Audience and Buyer Persona",
                        timeScope: "Week 2",
                        description: "We create detailed buyer personas—at least three, with one key persona—based on your audience's demographics, psychographics, and behavior patterns."
                    },
                    {
                        number: 3,
                        title: "Market Trends Analysis",
                        timeScope: "Week 3-4",
                        description: "We conduct in-depth market research to gain clarity on the wellness landscape and define the most effective way to market Roga."
                    },
                    {
                        number: 4,
                        title: "SWOT Analysis",
                        timeScope: "Week 4",
                        description: "We conduct a full SWOT analysis to identify Roga's strengths, weaknesses, opportunities, and threats—building a clear foundation for strategic decisions."
                    }
                ]
            },
            {
                id: "brand-guidelines",
                label: "Brand Guidelines",
                estimateRate: "$2,000 - $2,500",
                steps: [
                    {
                        number: 1,
                        title: "Brand Identity",
                        timeScope: "Week 1-2",
                        description: "We work closely with you to shape your brand, honoring your vision, your product, and aligning it with market standards. We establish your brand's visual identity—colors, typography, and logo—and craft graphic materials that bring consistency. "
                    },
                    {
                        number: 2,
                        title: "Voice & Tone Definition",
                        timeScope: "Week 2-3",
                        description: "How you communicate your brand matters. We design a detailed guide that maps out your touchpoints and brand interactions. This also includes a small SEO keywords bank to integrate in the copies."
                    },
                    {
                        number: 3,
                        title: "Aplications of Visual Identity",
                        timeScope: "Week 3-4",
                        description: "We demonstrate how to adapt your visual assets across different mediums—from social posts to emails—showing their various applications for consistent brand use."
                    },
                    {
                        number: 4,
                        title: "Social Media Design",
                        timeScope: "Week 4-5",
                        description: "We create a set of design rules for social posts, outlining layout, typography, color usage, and image treatment to ensure every post reflects your brand consistently."
                    }
                ]
            },
            {
                id: "social-media",
                label: "Social Media Campaign",
                estimateRate: "$6,000 - $8,000",
                steps: [
                    {
                        number: 1,
                        title: "Content Strategy Planning",
                        timeScope: "Week 1",
                        description: "We create a 3-month content calendar aligned with your brand and audience interests."
                    },
                    {
                        number: 2,
                        title: "Content Creation",
                        timeScope: "Week 2-6",
                        description: "We produce high-quality photos and videos using both in-house and external resources with our own models. We then create and edit the materials for versatile use across channels."
                    },
                    {
                        number: 3,
                        title: "Campaign Launch",
                        timeScope: "Week 4-8",
                        description: "We follow the calendar to start posting, continuously creating and editing assets, and launch campaigns across Instagram, Facebook, and TikTok."
                    },
                    {
                        number: 4,
                        title: "Performance Tracking",
                        timeScope: "Ongoing",
                        description: "We monitor analytics and engagement metrics, adjusting strategies based on performance data. A bi-weekly report summarizes all results."
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
        <div className="proposol">
            <button
                className="proposol__language-toggle"
                onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
                aria-label="Toggle language"
            >
                {language}
            </button>

            <div className="proposol__container">
                <div className="proposol__logo">
                    <img className="proposol__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                <div
                    className={`proposol__hero ${visibleSections.has('hero') ? 'proposol__hero--visible' : ''}`}
                    data-section-id="hero"
                    ref={(el) => (sectionRefs.current['hero'] = el)}
                >
                    <h1 className="proposol__hero-title">{t.hero.title}</h1>
                    <h3 className="proposol__hero-subtitle">{t.hero.subtitle}</h3>
                </div>

                <div
                    className={`proposol__section ${visibleSections.has('what-it-is') ? 'proposol__section--visible' : ''}`}
                    data-section-id="what-it-is"
                    ref={(el) => (sectionRefs.current['what-it-is'] = el)}
                >
                    <h4 className="proposol__section-subheading">{t.whatItIs.title}</h4>
                    <h2 className="proposol__section-subtitle">{t.whatItIs.subtitle}</h2>
                    <p className="proposol__section-text">{t.whatItIs.text}</p>
                </div>
                <section className="proposol__image">
                    <img className="proposol__image-bg" src={roga} alt="Roga wellness device" />
                    <div className="proposol__image-overlay"></div>
                    <div className="proposol__image-content">
                        <h4>{t.overview.title}</h4>
                        <h2 className="proposol__image-content-text">{t.overview.text}</h2>
                    </div>
                </section>

                <div
                    className={`proposol__section ${visibleSections.has('what-else') ? 'proposol__section--visible' : ''}`}
                    data-section-id="what-else"
                    ref={(el) => (sectionRefs.current['what-else'] = el)}
                >
                    <h4 className="proposol__section-subheading">{t.whatElse.title}</h4>
                    <p className="proposol__section-text">{t.whatElse.text}</p>
                </div>

               

                <div
                    className={`proposol__section ${visibleSections.has('traffic') ? 'proposol__section--visible' : ''}`}
                    data-section-id="traffic"
                    ref={(el) => (sectionRefs.current['traffic'] = el)}
                >
                     <div
                    className={`proposol__section ${visibleSections.has('actual-data') ? 'proposol__section--visible' : ''}`}
                    data-section-id="actual-data"
                    ref={(el) => (sectionRefs.current['actual-data'] = el)}
                >
                    <h4 className="proposol__section-subheading">{t.actualData.title}</h4>
                    <p className="proposol__section-text">{t.actualData.text1}</p>
                    <p className="proposol__section-text">{t.actualData.text2}</p>
                </div>
                   
                    <div className="proposol__chart" ref={chartRef}>
                         <p className="proposol__section-text">{t.traffic.title}</p>
                        <div className="proposol__chart-container">
                            <div className="proposol__chart-wrapper">
                                <svg viewBox="0 0 100 100" className="proposol__chart-svg">
                                    {segments.map((segment, index) => (
                                        <path
                                            key={segment.label}
                                            d={createArc(segment.start, segment.end)}
                                            fill={segment.color}
                                            className={`proposol__chart-segment ${isVisible ? "proposol__chart-segment--animate" : ""}`}
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                            }}
                                        />
                                    ))}
                                </svg>
                            </div>

                            <div className="proposol__chart-legend">
                                {chartData.map((item, index) => (
                                    <div
                                        key={item.label}
                                        className={`proposol__legend-item ${isVisible ? "proposol__legend-item--fade-in" : ""}`}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        <div className="proposol__legend-color" style={{ backgroundColor: item.color }} />
                                        <span className="proposol__legend-label">{item.label}:</span>
                                        <span className="proposol__legend-percentage">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                   <div
                        className={`proposol__section ${visibleSections.has('assessment') ? 'proposol__section--visible' : ''}`}
                        data-section-id="assessment"
                        ref={(el) => (sectionRefs.current['assessment'] = el)}
                    >
                        <h4 className="proposol__section-subheading">{t.assessment.title}</h4>
                        <div className="proposol__section-bullet-item">
                            <span className="proposol__section-bullet"></span>
                            <p className="proposol__section-text">{t.assessment.text1}</p>
                        </div>
                        <div className="proposol__section-bullet-item">
                            <span className="proposol__section-bullet"></span>
                            <p className="proposol__section-text">{t.assessment.text2}</p>
                        </div>
                        <div className="proposol__section-bullet-item">
                            <span className="proposol__section-bullet"></span>
                            <p className="proposol__section-text">{t.assessment.text3}</p>
                        </div>
                    </div>

                <section className="proposol__section-main">

                 

                    <div
                        className={`proposol__section ${visibleSections.has('gameplan-intro') ? 'proposol__section--visible' : ''}`}
                        data-section-id="gameplan-intro"
                        ref={(el) => (sectionRefs.current['gameplan-intro'] = el)}
                    >
                        <h4 className="proposol__section-subheading">{t.gameplanIntro.title}</h4>
                        <h2 className="proposol__section-subtitle">{t.gameplanIntro.subtitle}</h2>
                    </div>

                    <div
                        className={`proposol__section-line ${visibleSections.has('brand-identity') ? 'proposol__section-line--visible' : ''}`}
                        data-section-id="brand-identity"
                        ref={(el) => (sectionRefs.current['brand-identity'] = el)}
                    >
                        <h3 className="proposol__section-line-title">{t.brandIdentity.title}</h3>
                        <p className="proposol__section-line-text">{t.brandIdentity.text}</p>
                    </div>

                    <div
                        className={`proposol__section-line ${visibleSections.has('market') ? 'proposol__section-line--visible' : ''}`}
                        data-section-id="market"
                        ref={(el) => (sectionRefs.current['market'] = el)}
                    >
                        <h3 className="proposol__section-line-title">{t.market.title}</h3>
                        <p className="proposol__section-line-text">{t.market.text}</p>
                    </div>

                    <div
                        className={`proposol__section-line ${visibleSections.has('gameplan') ? 'proposol__section-line--visible' : ''}`}
                        data-section-id="gameplan"
                        ref={(el) => (sectionRefs.current['gameplan'] = el)}
                    >
                        <h3 className="proposol__section-line-title">{t.gameplan.title}</h3>
                        <p className="proposol__section-line-text">{t.gameplan.text}</p>
                    </div>

                </section>

                {/* Hero Image Section with Overlay */}
                <section className="proposol__image">
                    <img className="proposol__image-bg" src={yoga} alt="Roga wellness device" />
                    <div className="proposol__image-overlay"></div>
                    <div className="proposol__image-content">
                        <h4>{t.marketSection.title}</h4>
                        <h2 className="proposol__image-content-text">{t.marketSection.text}</h2>
                    </div>
                </section>

                {/* Services Carousel Section */}
                <section className="proposol__services">
                    <div
                        className={`proposol__services-header ${visibleSections.has('services-header') ? 'proposol__services-header--visible' : ''}`}
                        data-section-id="services-header"
                        ref={(el) => (sectionRefs.current['services-header'] = el)}
                    >
                        <h4 className="proposol__section-subheading">{t.servicesHeader.title}</h4>
                        <h2 className="proposol__section-subtitle">{t.servicesHeader.subtitle}</h2>
                    </div>

                    {/* Tabs */}
                    <div className="proposol__tabs">
                        {serviceOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`proposol__tab ${selectedTab === option.id ? 'proposol__tab--active' : ''}`}
                                onClick={() => setSelectedTab(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* Project Estimate Rate */}
                    <p className="proposol__estimate-rate">
                        {t.estimateRate} {serviceOptions.find(option => option.id === selectedTab)?.estimateRate}
                    </p>

                    {/* Carousel for each tab */}
                    <div className="proposol__carousel-container">
                        {serviceOptions.map((option) => (
                            <div key={option.id}>
                                <div
                                    className={`proposol__carousel-wrapper ${selectedTab === option.id ? 'proposol__carousel-wrapper--active' : ''}`}
                                >
                                    <button
                                        className="proposol__carousel-arrow proposol__carousel-arrow--left"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                        aria-label="Scroll left"
                                    >
                                        ‹
                                    </button>

                                    <div
                                        className="proposol__carousel"
                                        ref={(el) => (carouselRefs.current[option.id] = el)}
                                    >
                                        {option.steps.map((step) => (
                                            <div key={step.number} className="proposol__card">
                                                <div className="proposol__card-number">
                                                    <span className="proposol__card-number-text">{step.number}</span>
                                                </div>
                                                <h3 className="proposol__card-title">{step.title}</h3>
                                                <p className="proposol__card-time">{step.timeScope}</p>
                                                <p className="proposol__card-description">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="proposol__carousel-arrow proposol__carousel-arrow--right"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'right', option.id)}
                                        aria-label="Scroll right"
                                    >
                                        ›
                                    </button>
                                </div>

                                {/* Bottom navigation indicators */}
                                {selectedTab === option.id && (
                                    <div className="proposol__carousel-nav">
                                        <button
                                            className={`proposol__carousel-nav-button ${!scrollStates[option.id]?.canScrollLeft ? 'proposol__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                            disabled={!scrollStates[option.id]?.canScrollLeft}
                                            aria-label="Scroll left"
                                        >
                                            <IconChevronLeft size={20} />
                                        </button>
                                        <button
                                            className={`proposol__carousel-nav-button ${!scrollStates[option.id]?.canScrollRight ? 'proposol__carousel-nav-button--disabled' : ''}`}
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
                    className={`proposol__section ${visibleSections.has('results') ? 'proposol__section--visible' : ''}`}
                    data-section-id="results"
                    ref={(el) => (sectionRefs.current['results'] = el)}
                >
                    <h4 className="proposol__section-subheading">{t.results.title}</h4>
                    <h2 className="proposol__section-subtitle">{t.results.subtitle}</h2>
                    <p className="proposol__section-text">{t.results.text}</p>
                </div>

                <div
                    className={`proposol__section ${visibleSections.has('next-steps') ? 'proposol__section--visible' : ''}`}
                    data-section-id="next-steps"
                    ref={(el) => (sectionRefs.current['next-steps'] = el)}
                >
                    <h4 className="proposol__section-subheading">{t.nextSteps.title}</h4>
                    <h2 className="proposol__section-subtitle">{t.nextSteps.subtitle}</h2>
                    <div className="proposol__section-links">
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

export default ProposolRoga;
