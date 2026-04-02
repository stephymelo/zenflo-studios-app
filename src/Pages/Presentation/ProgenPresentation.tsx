import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import './_proposalroga.scss';
import './_progenpresentation.scss';


interface ChartData {
    label: string;
    sessions: number;
    change: string;
    percentage: number;
    color: string;
}

interface GoalCard {
    number: number;
    title: string;
    description: string;
}

interface GoalTab {
    id: string;
    label: string;
    strategicFocus?: string;
    cards: GoalCard[];
}

const ProgenPresentation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState("social-media-presence");
    const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean; canScrollRight: boolean } }>({});
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const chartRef = useRef<HTMLDivElement>(null);
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const chartData: ChartData[] = [
        { label: "Paid Social", sessions: 649, change: "+40.2%", percentage: 58.24, color: "#49D3BA" },
        { label: "Direct", sessions: 255, change: "-1.2%", percentage: 22.88, color: "#55a4a4" },
        { label: "Display", sessions: 99, change: "-19.5%", percentage: 8.89, color: "#ff9580" },
        { label: "Organic Search", sessions: 88, change: "+18.9%", percentage: 7.90, color: "#5A9B7D" },
        { label: "Referral", sessions: 22, change: "-4.3%", percentage: 1.97, color: "#E89B7C" },
        { label: "Paid Search", sessions: 2, change: "-92.6%", percentage: 0.18, color: "#3eb367" },
    ];

    const goalTabs: GoalTab[] = [
        {
            id: "social-media-presence",
            label: "Social Media Presence",
            strategicFocus: "Educational hair loss content, before/after results, product demos, expert positioning",
            cards: [
                { number: 1, title: "Reach & Impressions", description: "How many people see our content" },
                { number: 2, title: "Engagement Rate", description: "Are people interacting with our posts?" },
                { number: 3, title: "Video Performance", description: "How long do people watch our videos?" },
                { number: 4, title: "Follower Growth", description: "Is our audience getting bigger?" },
            ]
        },
        {
            id: "website-traffic",
            label: "Website Traffic",
            cards: [
                { number: 1, title: "Total Users & Sessions", description: "How many people visit the site" },
                { number: 2, title: "Traffic Source Mix", description: "Where are visitors coming from?" },
                { number: 3, title: "Engaged Sessions", description: "How many visitors actually do something on the site" },
                { number: 4, title: "Organic Growth", description: "Are more people finding us through Google?" },
            ]
        },
        {
            id: "on-site-engagement",
            label: "On-Site Engagement",
            cards: [
                { number: 1, title: "Time on Site", description: "Get visitors to stay longer (14s → 30-45s+)" },
                { number: 2, title: "Pages Per Visit", description: "Get visitors to look at more pages (1.47 → 2.0+)" },
                { number: 3, title: "Bounce Rate", description: "Fewer people leaving after one page" },
                { number: 4, title: "Landing Pages", description: "Make the first page people see more compelling" },
            ]
        },
        {
            id: "traffic-quality",
            label: "Traffic Quality",
            cards: [
                { number: 1, title: "Engaged Sessions", description: "How many visitors actually interact with the site" },
                { number: 2, title: "Multi-Page Views", description: "Are people exploring beyond the first page?" },
                { number: 3, title: "Returning Visitors", description: "Are people coming back?" },
                { number: 4, title: "Buying Signals", description: "Are visitors showing interest in products?" },
            ]
        },
        {
            id: "retargeting-audiences",
            label: "Retargeting Audiences",
            cards: [
                { number: 1, title: "Product Page Views", description: "Who looked at products? We can show them ads later." },
                { number: 2, title: "Cart Abandonment", description: "Who added items but didn't buy? Follow up with them." },
                { number: 3, title: "Audience Building", description: "Growing lists of interested people for future ads" },
                { number: 4, title: "Conversion Prep", description: "Getting audiences ready to buy when we run sales" },
            ]
        },
    ];

    // Max sessions for bar chart scaling
    const maxSessions = Math.max(...chartData.map(d => d.sessions));

    // Top pages data
    const topPages = [
        { label: "Shop Bestsellers", views: 688, change: "+39.6%" },
        { label: "Homepage", views: 243, change: "-24.3%" },
        { label: "Product Pages", views: 155, change: "+12.1%" },
    ];
    const maxPageViews = Math.max(...topPages.map(p => p.views));

    // Geographic data
    const geoData = [
        { label: "United States", users: 848, percentage: 76, color: "#49D3BA" },
        { label: "Singapore", users: 62, percentage: 5.5, color: "#55a4a4" },
        { label: "China", users: 48, percentage: 4.3, color: "#ff9580" },
        { label: "Canada", users: 41, percentage: 3.7, color: "#5A9B7D" },
        { label: "Mexico", users: 32, percentage: 2.9, color: "#E89B7C" },
        { label: "Other", users: 84, percentage: 7.6, color: "#3eb367" },
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

    useEffect(() => {
        goalTabs.forEach(tab => {
            checkScrollPosition(tab.id);
        });
    }, [selectedTab]);

    useEffect(() => {
        const handleScrollEvent = (id: string) => () => checkScrollPosition(id);
        const listeners: { [key: string]: () => void } = {};

        goalTabs.forEach(tab => {
            const ref = carouselRefs.current[tab.id];
            if (ref) {
                const listener = handleScrollEvent(tab.id);
                listeners[tab.id] = listener;
                ref.addEventListener('scroll', listener);
            }
        });

        return () => {
            goalTabs.forEach(tab => {
                const ref = carouselRefs.current[tab.id];
                if (ref && listeners[tab.id]) {
                    ref.removeEventListener('scroll', listeners[tab.id]);
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

    const currentTab = goalTabs.find(tab => tab.id === selectedTab);

    return (
        <div className="proposal">
            <div className="proposal__container">
                <div className="proposal__logo">
                    <img className="proposal__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                {/* 1. Hero Section */}
                <div
                    className={`proposal__hero ${visibleSections.has('hero') ? 'proposal__hero--visible' : ''}`}
                    data-section-id="hero"
                    ref={(el) => (sectionRefs.current['hero'] = el)}
                >
                    <h1 className="proposal__hero-title progen-hero-title">Progen Global</h1>
                    <h2 className="progen-hero-period">Last 7 Days</h2>
                    <h3 className="proposal__hero-subtitle">Website Performance Report — How people find and use the site</h3>
                </div>

                {/* 2. April Goals — Tabbed Carousel (MOVED UP) */}
                <section className="proposal__services">
                    <div
                        className={`proposal__services-header ${visibleSections.has('april-goals') ? 'proposal__services-header--visible' : ''}`}
                        data-section-id="april-goals"
                        ref={(el) => (sectionRefs.current['april-goals'] = el)}
                    >
                        <h4 className="proposal__section-subheading">APRIL GOALS</h4>
                        <h2 className="proposal__section-subtitle">What we're tracking this month — organized by focus area.</h2>
                    </div>

                    {/* Tabs */}
                    <div className="proposal__tabs">
                        {goalTabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`proposal__tab ${selectedTab === tab.id ? 'proposal__tab--active' : ''}`}
                                onClick={() => setSelectedTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Strategic Focus (if present) */}
                    {currentTab?.strategicFocus && (
                        <p className="proposal__estimate-rate">
                            Focus: {currentTab.strategicFocus}
                        </p>
                    )}

                    {/* Carousel for each tab */}
                    <div className="proposal__carousel-container">
                        {goalTabs.map((tab) => (
                            <div key={tab.id}>
                                <div
                                    className={`proposal__carousel-wrapper ${selectedTab === tab.id ? 'proposal__carousel-wrapper--active' : ''}`}
                                >
                                    <button
                                        className="proposal__carousel-arrow proposal__carousel-arrow--left"
                                        onClick={() => handleScroll(carouselRefs.current[tab.id], 'left', tab.id)}
                                        aria-label="Scroll left"
                                    >
                                        <IconChevronLeft size={20} />
                                    </button>

                                    <div
                                        className="proposal__carousel"
                                        ref={(el) => (carouselRefs.current[tab.id] = el)}
                                    >
                                        {tab.cards.map((card) => (
                                            <div key={card.number} className="proposal__card">
                                                <div className="proposal__card-number">
                                                    <span className="proposal__card-number-text">{card.number}</span>
                                                </div>
                                                <h3 className="proposal__card-title">{card.title}</h3>
                                                <p className="proposal__card-description">{card.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="proposal__carousel-arrow proposal__carousel-arrow--right"
                                        onClick={() => handleScroll(carouselRefs.current[tab.id], 'right', tab.id)}
                                        aria-label="Scroll right"
                                    >
                                        <IconChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Bottom navigation indicators */}
                                {selectedTab === tab.id && (
                                    <div className="proposal__carousel-nav">
                                        <button
                                            className={`proposal__carousel-nav-button ${!scrollStates[tab.id]?.canScrollLeft ? 'proposal__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[tab.id], 'left', tab.id)}
                                            disabled={!scrollStates[tab.id]?.canScrollLeft}
                                            aria-label="Scroll left"
                                        >
                                            <IconChevronLeft size={20} />
                                        </button>
                                        <button
                                            className={`proposal__carousel-nav-button ${!scrollStates[tab.id]?.canScrollRight ? 'proposal__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[tab.id], 'right', tab.id)}
                                            disabled={!scrollStates[tab.id]?.canScrollRight}
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

                {/* 3. Executive Summary — Metric Cards */}
                <div
                    className={`proposal__section ${visibleSections.has('executive-summary') ? 'proposal__section--visible' : ''}`}
                    data-section-id="executive-summary"
                    ref={(el) => (sectionRefs.current['executive-summary'] = el)}
                >
                    <h4 className="proposal__section-subheading">EXECUTIVE SUMMARY</h4>

                    <div className="progen-metrics">
                        <div className="progen-metric-card">
                            <span className="progen-metric-card__label">Active Users</span>
                            <span className="progen-metric-card__value">1.1K</span>
                            <span className="progen-metric-card__badge progen-metric-card__badge--up">
                                <span className="progen-metric-card__arrow">▲</span> +11.6%
                            </span>
                        </div>
                        <div className="progen-metric-card">
                            <span className="progen-metric-card__label">Total Events</span>
                            <span className="progen-metric-card__value">4.9K</span>
                            <span className="progen-metric-card__badge progen-metric-card__badge--up">
                                <span className="progen-metric-card__arrow">▲</span> +5.3%
                            </span>
                        </div>
                        <div className="progen-metric-card">
                            <span className="progen-metric-card__label">Purchases</span>
                            <span className="progen-metric-card__value">2</span>
                            <span className="progen-metric-card__badge progen-metric-card__badge--down">
                                <span className="progen-metric-card__arrow">▼</span> -33.3%
                            </span>
                        </div>
                    </div>

                    <p className="proposal__section-text" style={{ marginTop: '1.5rem' }}>
                        People are finding the site, but most leave without doing anything. We need to give them a reason to stay.
                    </p>
                </div>

                {/* 4. Traffic & Acquisition */}
                <div
                    className={`proposal__section ${visibleSections.has('traffic') ? 'proposal__section--visible' : ''}`}
                    data-section-id="traffic"
                    ref={(el) => (sectionRefs.current['traffic'] = el)}
                >
                    <h4 className="proposal__section-subheading">TRAFFIC & ACQUISITION</h4>

                    <div className="proposal__chart" ref={chartRef}>
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
                                        <span className="proposal__legend-percentage">{item.sessions} sessions ({item.change})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Bar Chart — Sessions by Channel */}
                    <div className="progen-bar-chart">
                        <div className="progen-bar-chart__title">Sessions by Channel</div>
                        {chartData.map((item) => (
                            <div key={item.label} className="progen-bar-chart__row">
                                <span className="progen-bar-chart__label">{item.label}</span>
                                <div className="progen-bar-chart__track">
                                    <div
                                        className="progen-bar-chart__fill"
                                        style={{
                                            width: visibleSections.has('traffic') ? `${(item.sessions / maxSessions) * 100}%` : '0%',
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                                <span className="progen-bar-chart__value">{item.sessions}</span>
                            </div>
                        ))}
                    </div>

                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Most visitors come from paid social media ads</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Google searches are bringing more people — these visitors are more likely to buy</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Almost nobody finds us through paid Google search ads — we're missing people who are actively looking to buy</p>
                    </div>
                </div>

                {/* 5. Geographic Distribution */}
                <div
                    className={`proposal__section ${visibleSections.has('geographic') ? 'proposal__section--visible' : ''}`}
                    data-section-id="geographic"
                    ref={(el) => (sectionRefs.current['geographic'] = el)}
                >
                    <h4 className="proposal__section-subheading">GEOGRAPHIC DISTRIBUTION</h4>

                    <div className="progen-geo-bar">
                        {geoData.map((item) => (
                            <div key={item.label} className="progen-geo-bar__row">
                                <span className="progen-geo-bar__label">{item.label}</span>
                                <div className="progen-geo-bar__track">
                                    <div
                                        className="progen-geo-bar__fill"
                                        style={{
                                            width: visibleSections.has('geographic') ? `${item.percentage}%` : '0%',
                                            backgroundColor: item.color,
                                        }}
                                    />
                                </div>
                                <span className="progen-geo-bar__value">{item.users} users ({item.percentage}%)</span>
                            </div>
                        ))}
                    </div>

                    <p className="proposal__section-text" style={{ marginTop: '1.5rem' }}>
                        Over 3 out of 4 visitors are in the US. There's a chance to tailor messaging for the top countries and grow those audiences.
                    </p>
                </div>

                {/* 6. Behavior & Engagement */}
                <div
                    className={`proposal__section ${visibleSections.has('behavior') ? 'proposal__section--visible' : ''}`}
                    data-section-id="behavior"
                    ref={(el) => (sectionRefs.current['behavior'] = el)}
                >
                    <h4 className="proposal__section-subheading">BEHAVIOR & ENGAGEMENT</h4>

                    {/* Metric Cards */}
                    <div className="progen-behavior-metrics">
                        <div className="progen-behavior-card">
                            <span className="progen-behavior-card__label">Views Per User</span>
                            <span className="progen-behavior-card__value">1.47</span>
                            <span className="progen-behavior-card__target">
                                <span className="progen-behavior-card__target-icon"></span>
                                Goal: 2.0+
                            </span>
                        </div>
                        <div className="progen-behavior-card">
                            <span className="progen-behavior-card__label">Avg Engagement Time</span>
                            <span className="progen-behavior-card__value progen-behavior-card__value--warning">14s</span>
                            <span className="progen-behavior-card__target">
                                <span className="progen-behavior-card__target-icon"></span>
                                Goal: 30-45s+
                            </span>
                        </div>
                    </div>

                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Most people look at just one page and leave</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">14 seconds is way too short — people aren't finding what they need</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">The website isn't grabbing attention when people land on it</p>
                    </div>

                    {/* Top Pages Bar Chart */}
                    <div className="progen-top-pages">
                        <div className="progen-top-pages__title">Most Viewed Pages</div>
                        {topPages.map((page) => (
                            <div key={page.label} className="progen-top-pages__row">
                                <span className="progen-top-pages__label">{page.label}</span>
                                <div className="progen-top-pages__track">
                                    <div
                                        className="progen-top-pages__fill"
                                        style={{
                                            width: visibleSections.has('behavior') ? `${(page.views / maxPageViews) * 100}%` : '0%',
                                        }}
                                    />
                                </div>
                                <span className="progen-top-pages__value">{page.views} views ({page.change})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. Conversion Snapshot */}
                <div
                    className={`proposal__section ${visibleSections.has('conversion') ? 'proposal__section--visible' : ''}`}
                    data-section-id="conversion"
                    ref={(el) => (sectionRefs.current['conversion'] = el)}
                >
                    <h4 className="proposal__section-subheading">CONVERSION SNAPSHOT</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Purchases: <strong>2 (-33.3%)</strong></p>
                    </div>

                </div>

                {/* 8. Key Problems Identified */}
                <div
                    className={`proposal__section ${visibleSections.has('key-problems') ? 'proposal__section--visible' : ''}`}
                    data-section-id="key-problems"
                    ref={(el) => (sectionRefs.current['key-problems'] = el)}
                >
                    <h4 className="proposal__section-subheading">KEY PROBLEMS IDENTIFIED</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>People leave too fast:</strong> 14 seconds on site is way below where it should be</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>Visitors don't stick around:</strong> Social media ads bring people in, but they're not interested enough to explore</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>One-page visits:</strong> Most people look at one page and bounce — they're not browsing the site</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>No Google ads:</strong> We're barely running paid search ads, so we're missing people who are actively looking to buy hair products</p>
                    </div>
                </div>

                {/* 9. What's Working */}
                <div
                    className={`proposal__section ${visibleSections.has('whats-working') ? 'proposal__section--visible' : ''}`}
                    data-section-id="whats-working"
                    ref={(el) => (sectionRefs.current['whats-working'] = el)}
                >
                    <h4 className="proposal__section-subheading">WHAT'S WORKING</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">We're bringing a lot of people to the site — traffic is growing</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Social media ads are performing well and bringing more visitors than last month</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">More people are checking out product pages — interest in the products is growing</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">The US market is strong — most of our traffic comes from the right audience</p>
                    </div>
                </div>

                {/* 10. April Strategy Context */}
                <div
                    className={`proposal__section ${visibleSections.has('april-strategy') ? 'proposal__section--visible' : ''}`}
                    data-section-id="april-strategy"
                    ref={(el) => (sectionRefs.current['april-strategy'] = el)}
                >
                    <h4 className="proposal__section-subheading">APRIL STRATEGY CONTEXT</h4>
                    <p className="proposal__section-text">
                        This month is about getting the brand in front of more people — no promotions or sales pushes. We're focused on growing the audience, driving traffic, educating people about Progen, and building trust.
                    </p>
                    <p className="proposal__section-text" style={{ marginTop: '1rem' }}>
                        We'll measure success by how much people engage and how good the traffic is — not by how many sales we make.
                    </p>
                </div>

                {/* 11. Final Strategic Insight */}
                <div
                    className={`proposal__section ${visibleSections.has('final-insight') ? 'proposal__section--visible' : ''}`}
                    data-section-id="final-insight"
                    ref={(el) => (sectionRefs.current['final-insight'] = el)}
                >
                    <h4 className="proposal__section-subheading">FINAL STRATEGIC INSIGHT</h4>
                    <h2 className="proposal__section-subtitle">The problem isn't getting people to the site — it's getting them to stay and do something.</h2>
                    <p className="proposal__section-text" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong>This month we're focused on:</strong></p>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Bringing better-quality visitors who are actually interested in the products</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Making the website more engaging so people explore instead of bouncing</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Building a solid foundation so when we run promotions, people are ready to buy</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ProgenPresentation;
