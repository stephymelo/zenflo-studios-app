import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import './_proposalroga.scss';


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
            strategicFocus: "Educational content around hair loss solutions, before/after transformations, product demonstrations, authority positioning",
            cards: [
                { number: 1, title: "Reach & Impressions", description: "Track reach and impressions growth across platforms" },
                { number: 2, title: "Engagement Rate", description: "Monitor likes, comments, shares, saves" },
                { number: 3, title: "Video Performance", description: "Track watch time and retention metrics" },
                { number: 4, title: "Follower Growth", description: "Measure audience growth rate" },
            ]
        },
        {
            id: "website-traffic",
            label: "Website Traffic",
            cards: [
                { number: 1, title: "Total Users & Sessions", description: "Increase volume of qualified traffic" },
                { number: 2, title: "Traffic Source Mix", description: "Increase organic and intent-driven traffic" },
                { number: 3, title: "Engaged Sessions", description: "Track meaningful site interactions" },
                { number: 4, title: "Organic Growth", description: "Grow organic search contribution" },
            ]
        },
        {
            id: "on-site-engagement",
            label: "On-Site Engagement",
            cards: [
                { number: 1, title: "Engagement Time", description: "Increase from ~14s to 30-45s+" },
                { number: 2, title: "Views Per User", description: "Increase from ~1.47 to 2.0+" },
                { number: 3, title: "Bounce Rate", description: "Reduce single-page exits" },
                { number: 4, title: "Landing Page Optimization", description: "Improve clarity and value proposition" },
            ]
        },
        {
            id: "traffic-quality",
            label: "Traffic Quality",
            cards: [
                { number: 1, title: "Engaged Sessions", description: "Track sessions with meaningful interaction" },
                { number: 2, title: "Multi-Page Views", description: "Increase sessions with multiple page views" },
                { number: 3, title: "Returning Users", description: "Build returning visitor base" },
                { number: 4, title: "Intent Signals", description: "Monitor high-intent behavior patterns" },
            ]
        },
        {
            id: "retargeting-audiences",
            label: "Retargeting Audiences",
            cards: [
                { number: 1, title: "View Content Events", description: "Track product page views for retargeting" },
                { number: 2, title: "Add-to-Cart Events", description: "Build cart abandonment audiences" },
                { number: 3, title: "Audience Building", description: "Grow 30/60/90 day audience pools" },
                { number: 4, title: "Conversion Prep", description: "Prepare audiences for future conversion campaigns" },
            ]
        },
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
                    <h1 className="proposal__hero-title">Progen Global</h1>
                    <h3 className="proposal__hero-subtitle">Analytics Report — Awareness Performance & Traffic Quality</h3>
                </div>

                {/* 2. Executive Summary */}
                <div
                    className={`proposal__section ${visibleSections.has('executive-summary') ? 'proposal__section--visible' : ''}`}
                    data-section-id="executive-summary"
                    ref={(el) => (sectionRefs.current['executive-summary'] = el)}
                >
                    <h4 className="proposal__section-subheading">EXECUTIVE SUMMARY</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>1.1K</strong> active users <strong>(+11.6%)</strong></p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>4.9K</strong> total events <strong>(+5.3%)</strong></p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>2</strong> purchases <strong>(-33.3%)</strong></p>
                    </div>
                    <p className="proposal__section-text" style={{ marginTop: '1.5rem' }}>
                        The current performance confirms that the brand is successfully driving awareness, but users are not yet transitioning into deeper engagement or conversion behavior.
                    </p>
                </div>

                {/* 3. Traffic & Acquisition */}
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

                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Heavy dependence on Paid Social, consistent with awareness campaigns</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Organic Search is growing, indicating potential for higher-intent traffic</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Paid Search is almost non-existent, limiting bottom-funnel capture</p>
                    </div>
                </div>

                {/* 4. Geographic Distribution */}
                <div
                    className={`proposal__section ${visibleSections.has('geographic') ? 'proposal__section--visible' : ''}`}
                    data-section-id="geographic"
                    ref={(el) => (sectionRefs.current['geographic'] = el)}
                >
                    <h4 className="proposal__section-subheading">GEOGRAPHIC DISTRIBUTION</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>United States:</strong> 848 users (+24.3%)</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>Secondary markets:</strong> Singapore, China, Canada, Mexico</p>
                    </div>
                    <p className="proposal__section-text" style={{ marginTop: '1.5rem' }}>
                        Strong concentration in the U.S. market. Opportunity to localize messaging and scale performance in top regions.
                    </p>
                </div>

                {/* 5. Behavior & Engagement */}
                <div
                    className={`proposal__section ${visibleSections.has('behavior') ? 'proposal__section--visible' : ''}`}
                    data-section-id="behavior"
                    ref={(el) => (sectionRefs.current['behavior'] = el)}
                >
                    <h4 className="proposal__section-subheading">BEHAVIOR & ENGAGEMENT</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Views per user: <strong>~1.47</strong></p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Avg engagement time: <strong>~14 seconds</strong></p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Majority of users leave after one page</p>
                    </div>

                    <p className="proposal__section-text" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}><strong>Interpretation:</strong></p>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Users are clicking but not engaging</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Indicates weak landing experience and/or low intent traffic</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Disconnect between ad messaging and on-site experience</p>
                    </div>

                    <p className="proposal__section-text" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}><strong>Top Pages:</strong></p>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Shop Bestsellers: <strong>688 views (+39.6%)</strong></p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Homepage: <strong>243 views (-24.3%)</strong></p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Product and analyzer pages: moderate but growing</p>
                    </div>
                </div>

                {/* 6. Conversion Snapshot */}
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
                    <p className="proposal__section-text" style={{ marginTop: '1.5rem' }}>
                        Expected under an awareness-only campaign. Priority should be engagement and intent building, not immediate sales.
                    </p>
                </div>

                {/* 7. Key Problems Identified */}
                <div
                    className={`proposal__section ${visibleSections.has('key-problems') ? 'proposal__section--visible' : ''}`}
                    data-section-id="key-problems"
                    ref={(el) => (sectionRefs.current['key-problems'] = el)}
                >
                    <h4 className="proposal__section-subheading">KEY PROBLEMS IDENTIFIED</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>Low engagement:</strong> 14-second average session time is critically low</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>Weak traffic quality:</strong> Paid Social is driving volume but not qualified users</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>Poor funnel depth:</strong> Users are not navigating beyond the first page</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text"><strong>Lack of intent-based channels:</strong> Minimal Paid Search presence</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Limited capture of high-intent demand</p>
                    </div>
                </div>

                {/* 8. What's Working */}
                <div
                    className={`proposal__section ${visibleSections.has('whats-working') ? 'proposal__section--visible' : ''}`}
                    data-section-id="whats-working"
                    ref={(el) => (sectionRefs.current['whats-working'] = el)}
                >
                    <h4 className="proposal__section-subheading">WHAT'S WORKING</h4>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Strong ability to generate traffic at scale</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Growth in Paid Social performance</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Increasing interest in product-related pages</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Strong traction in the U.S. market</p>
                    </div>
                </div>

                {/* 9. April Strategy Context */}
                <div
                    className={`proposal__section ${visibleSections.has('april-strategy') ? 'proposal__section--visible' : ''}`}
                    data-section-id="april-strategy"
                    ref={(el) => (sectionRefs.current['april-strategy'] = el)}
                >
                    <h4 className="proposal__section-subheading">APRIL STRATEGY CONTEXT</h4>
                    <p className="proposal__section-text">
                        The campaign for April is focused on brand awareness (no promotions), audience growth, traffic generation, education and positioning.
                    </p>
                    <p className="proposal__section-text" style={{ marginTop: '1rem' }}>
                        Success should be measured through engagement and traffic quality rather than direct conversions.
                    </p>
                </div>

                {/* 10. April Goals — Tabbed Carousel */}
                <section className="proposal__services">
                    <div
                        className={`proposal__services-header ${visibleSections.has('april-goals') ? 'proposal__services-header--visible' : ''}`}
                        data-section-id="april-goals"
                        ref={(el) => (sectionRefs.current['april-goals'] = el)}
                    >
                        <h4 className="proposal__section-subheading">APRIL GOALS</h4>
                        <h2 className="proposal__section-subtitle">Key performance indicators to track across each strategic pillar.</h2>
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
                            Strategic Focus: {currentTab.strategicFocus}
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

                {/* 11. Final Strategic Insight */}
                <div
                    className={`proposal__section ${visibleSections.has('final-insight') ? 'proposal__section--visible' : ''}`}
                    data-section-id="final-insight"
                    ref={(el) => (sectionRefs.current['final-insight'] = el)}
                >
                    <h4 className="proposal__section-subheading">FINAL STRATEGIC INSIGHT</h4>
                    <h2 className="proposal__section-subtitle">The primary issue is not traffic volume, but engagement and intent.</h2>
                    <p className="proposal__section-text" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong>April focus:</strong></p>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Improving user quality</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Increasing engagement depth</p>
                    </div>
                    <div className="proposal__section-bullet-item">
                        <span className="proposal__section-bullet"></span>
                        <p className="proposal__section-text">Building a stronger foundation for future conversions</p>
                    </div>
                </div>

                {/* 12. Next Steps */}
                <div
                    className={`proposal__section ${visibleSections.has('next-steps') ? 'proposal__section--visible' : ''}`}
                    data-section-id="next-steps"
                    ref={(el) => (sectionRefs.current['next-steps'] = el)}
                >
                    <h4 className="proposal__section-subheading">NEXT STEPS</h4>
                    <h2 className="proposal__section-subtitle">Let's get in touch and start creating together.</h2>
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

export default ProgenPresentation;
