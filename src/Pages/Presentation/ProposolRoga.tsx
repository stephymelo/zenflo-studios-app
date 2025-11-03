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
    const chartRef = useRef<HTMLDivElement>(null);
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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
            label: "Market Research",
            estimateRate: "$2,500 - $3,500",
            steps: [
                {
                    number: 1,
                    title: "Competitor Analysis",
                    timeScope: "Week 1-2",
                    description: "Deep dive into your competitors' strategies, content, and audience engagement to identify opportunities."
                },
                {
                    number: 2,
                    title: "Target Audience Definition",
                    timeScope: "Week 2-3",
                    description: "Create detailed buyer personas based on demographics, psychographics, and behavioral patterns."
                },
                {
                    number: 3,
                    title: "Market Trends Analysis",
                    timeScope: "Week 3-4",
                    description: "Research current wellness and meditation market trends to position Roga effectively."
                },
                {
                    number: 4,
                    title: "SWOT Analysis",
                    timeScope: "Week 4",
                    description: "Identify strengths, weaknesses, opportunities, and threats in the current market landscape."
                }
            ]
        },
        {
            id: "brand-guidelines",
            label: "Brand Guidelines",
            estimateRate: "$4,000 - $5,500",
            steps: [
                {
                    number: 1,
                    title: "Brand Identity Development",
                    timeScope: "Week 1-2",
                    description: "Define your brand's visual identity, including color palette, typography, and logo usage."
                },
                {
                    number: 2,
                    title: "Voice & Tone Documentation",
                    timeScope: "Week 2-3",
                    description: "Establish how your brand communicates across all touchpoints with clear guidelines."
                },
                {
                    number: 3,
                    title: "Visual Asset Library",
                    timeScope: "Week 3-4",
                    description: "Create templates, graphics, and imagery that align with your brand identity."
                },
                {
                    number: 4,
                    title: "Brand Guidelines Manual",
                    timeScope: "Week 4-5",
                    description: "Compile comprehensive brand guidelines for consistent application across all channels."
                }
            ]
        },
        {
            id: "social-media",
            label: "Social Media Campaign",
            estimateRate: "$3,500 - $6,000",
            steps: [
                {
                    number: 1,
                    title: "Content Strategy Planning",
                    timeScope: "Week 1",
                    description: "Develop a 3-month content calendar aligned with your brand and audience interests."
                },
                {
                    number: 2,
                    title: "Content Creation",
                    timeScope: "Week 2-6",
                    description: "Produce high-quality photos, videos, and graphics optimized for each platform."
                },
                {
                    number: 3,
                    title: "Campaign Launch",
                    timeScope: "Week 7-8",
                    description: "Execute coordinated campaign launch across Instagram, TikTok, and other channels."
                },
                {
                    number: 4,
                    title: "Performance Tracking",
                    timeScope: "Ongoing",
                    description: "Monitor analytics, engagement metrics, and adjust strategy based on performance data."
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
        <div className="proposol">
            <div className="proposol__container">
                <div className="proposol__logo">
                    <img className="proposol__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                <div
                    className={`proposol__hero ${visibleSections.has('hero') ? 'proposol__hero--visible' : ''}`}
                    data-section-id="hero"
                    ref={(el) => (sectionRefs.current['hero'] = el)}
                >
                    <h1 className="proposol__hero-title">Hey there Roga.ai</h1>
                    <h3 className="proposol__hero-subtitle">We are Zenflo, keep scrolling down to see what we found about you.</h3>
                </div>

                <div
                    className={`proposol__section ${visibleSections.has('what-it-is') ? 'proposol__section--visible' : ''}`}
                    data-section-id="what-it-is"
                    ref={(el) => (sectionRefs.current['what-it-is'] = el)}
                >
                    <h4 className="proposol__section-subheading">What it is</h4>
                    <h2 className="proposol__section-subtitle">Roga is a device that stimulates the vagus nerve to help manage stress, improve sleep and even help you focus.</h2>
                    <p className="proposol__section-text"> It's very easy to use and has an app that controls the device and offers different meditation content.</p>
                </div>
                <section className="proposol__image">
                    <img className="proposol__image-bg" src={roga} alt="Roga wellness device" />
                    <div className="proposol__image-overlay"></div>
                    <div className="proposol__image-content">
                        <h4>Overview</h4>
                        <h2 className="proposol__image-content-text">Lightweight, 3 colors, plug and play</h2>
                    </div>
                </section>

                <div
                    className={`proposol__section ${visibleSections.has('what-else') ? 'proposol__section--visible' : ''}`}
                    data-section-id="what-else"
                    ref={(el) => (sectionRefs.current['what-else'] = el)}
                >
                    <h4 className="proposol__section-subheading">What else did we find?</h4>
                    <p className="proposol__section-text">Your store is built on Shopify — that's great! Shopify offers powerful tools to connect and streamline leads from social media and search engines, plus seamless email marketing flows through its built-in system or integrations like Mailchimp.</p>
                </div>

                <div
                    className={`proposol__section ${visibleSections.has('actual-data') ? 'proposol__section--visible' : ''}`}
                    data-section-id="actual-data"
                    ref={(el) => (sectionRefs.current['actual-data'] = el)}
                >
                    <h4 className="proposol__section-subheading">Some actual data</h4>
                    <p className="proposol__section-text">We saw that you had approximately 2k visits this last month. Your top keywords were:</p>
                    <p className="proposol__section-text">"Roga startup" and "Roga"</p>
                </div>

                <div
                    className={`proposol__section ${visibleSections.has('traffic') ? 'proposol__section--visible' : ''}`}
                    data-section-id="traffic"
                    ref={(el) => (sectionRefs.current['traffic'] = el)}
                >
                    <h4 className="proposol__section-subheading">Traffic on your site</h4>
                    <div className="proposol__chart" ref={chartRef}>
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

                <section className="proposol__section-main">

                    <div
                        className={`proposol__section ${visibleSections.has('assessment') ? 'proposol__section--visible' : ''}`}
                        data-section-id="assessment"
                        ref={(el) => (sectionRefs.current['assessment'] = el)}
                    >
                        <h4 className="proposol__section-subheading">Quick assestment</h4>
                        <p className="proposol__section-text">Non-consistent branding</p>
                        <p className="proposol__section-text">Views are low for the mayority of videos, some had a really good perfomance</p>
                    </div>

                    <div
                        className={`proposol__section ${visibleSections.has('gameplan-intro') ? 'proposol__section--visible' : ''}`}
                        data-section-id="gameplan-intro"
                        ref={(el) => (sectionRefs.current['gameplan-intro'] = el)}
                    >
                        <h4 className="proposol__section-subheading">The gameplan</h4>
                        <h2 className="proposol__section-subtitle">We want the world to know the value of your product, and that means starting with the basics. Here are some the things we can start off with.</h2>
                    </div>

                    <div
                        className={`proposol__section-line ${visibleSections.has('brand-identity') ? 'proposol__section-line--visible' : ''}`}
                        data-section-id="brand-identity"
                        ref={(el) => (sectionRefs.current['brand-identity'] = el)}
                    >
                        <h3 className="proposol__section-line-title">Defining the brand identity</h3>
                        <p className="proposol__section-line-text">Using what you have defined in terms of look and feel and messaging from your product, packaging and website, we need to connect that with your socials.</p>
                    </div>

                    <div
                        className={`proposol__section-line ${visibleSections.has('market') ? 'proposol__section-line--visible' : ''}`}
                        data-section-id="market"
                        ref={(el) => (sectionRefs.current['market'] = el)}
                    >
                        <h3 className="proposol__section-line-title">Understand your market</h3>
                        <p className="proposol__section-line-text">A little bit of research is always needed before designing. Understanding the market, defining your target audience. As previously mentioned, its women in their 30's to 40's, they like to meditate, do yoga, take care of themselves to try to live a stress free life. We will create a buyer persona based on this and our own research to always have them in mind when designing. We will also look for people and have them on hand for any photographic, videographic material needed.</p>
                    </div>

                    <div
                        className={`proposol__section-line ${visibleSections.has('gameplan') ? 'proposol__section-line--visible' : ''}`}
                        data-section-id="gameplan"
                        ref={(el) => (sectionRefs.current['gameplan'] = el)}
                    >
                        <h3 className="proposol__section-line-title">The gameplan</h3>
                        <p className="proposol__section-line-text">We will create a gameplan for a 3 month campaign, have a consistent posting schedule, having the content planned out and assets filed.</p>
                    </div>

                </section>

                {/* Hero Image Section with Overlay */}
                <section className="proposol__image">
                    <img className="proposol__image-bg" src={yoga} alt="Roga wellness device" />
                    <div className="proposol__image-overlay"></div>
                    <div className="proposol__image-content">
                        <h4>Market</h4>
                        <h2 className="proposol__image-content-text">Women in their 30's-40's</h2>
                    </div>
                </section>

                {/* Services Carousel Section */}
                <section className="proposol__services">
                    <div
                        className={`proposol__services-header ${visibleSections.has('services-header') ? 'proposol__services-header--visible' : ''}`}
                        data-section-id="services-header"
                        ref={(el) => (sectionRefs.current['services-header'] = el)}
                    >
                        <h4 className="proposol__section-subheading">Project details</h4>
                        <h2 className="proposol__section-subtitle">Choose a project to see the detailed process and timescrope</h2>
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
                        Project estimate rate: {serviceOptions.find(option => option.id === selectedTab)?.estimateRate}
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
                    <h4 className="proposol__section-subheading">Results</h4>
                    <h2 className="proposol__section-subtitle">For us it's important you actually see the results.</h2>
                    <p className="proposol__section-text"> We tackle things based on the project, not on how much time we spend doing it, we want you to have an excellent service, that means you can talk to us every day of the week at anytime.</p>
                </div>

                <div
                    className={`proposol__section ${visibleSections.has('next-steps') ? 'proposol__section--visible' : ''}`}
                    data-section-id="next-steps"
                    ref={(el) => (sectionRefs.current['next-steps'] = el)}
                >
                    <h4 className="proposol__section-subheading">Next Steps</h4>
                    <h2 className="proposol__section-subtitle">Let's get in touch and start creating together.</h2>
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
