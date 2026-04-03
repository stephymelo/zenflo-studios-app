import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import './_proposalscp.scss';

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

const ProposalSCP = () => {
    const [selectedTab, setSelectedTab] = useState("collections");
    const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean; canScrollRight: boolean } }>({});
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const serviceOptions: ServiceOption[] = [
        {
            id: "collections",
            label: "Product Collections",
            estimateRate: "",
            steps: [
                {
                    number: 1,
                    title: "Organize by Brand",
                    timeScope: "Jan 31 – Feb 3",
                    description: "Group all products into collections by brand. Each brand gets its own dedicated collection page on Shopify with consistent naming and imagery.",
                },
                {
                    number: 2,
                    title: "Organize by Product Type",
                    timeScope: "Feb 3 – Feb 5",
                    description: "Create collections based on product type — cleansers, serums, moisturizers, masks, tools, etc. This helps clients browse by category.",
                },
                {
                    number: 3,
                    title: "Organize by Skin Concern",
                    timeScope: "Feb 5 – Feb 7",
                    description: "Build collections around skin concerns: acne, aging, hyperpigmentation, dryness, sensitivity. This guides clients to the right products for their needs.",
                },
            ],
        },
        {
            id: "product-page",
            label: "Product Page Redesign",
            estimateRate: "",
            steps: [
                {
                    number: 1,
                    title: "Product Description & Targeting",
                    timeScope: "Feb 7 – Feb 10",
                    description: "Rewrite product descriptions to include what the product targets, who it works best for, and key ingredients. Make it informative and easy to scan.",
                },
                {
                    number: 2,
                    title: "Product Details & How-To",
                    timeScope: "Feb 10 – Feb 12",
                    description: "Add detailed product information sections: usage instructions, application tips, and product videos demonstrating how to use each item.",
                },
                {
                    number: 3,
                    title: "Ingredients Breakdown",
                    timeScope: "Feb 12 – Feb 14",
                    description: "Display a clear ingredients list with highlights on active ingredients and their benefits. This builds trust and transparency with estheticians and cosmetologists.",
                },
            ],
        },
        {
            id: "creatives",
            label: "Product Creatives",
            estimateRate: "",
            steps: [
                {
                    number: 1,
                    title: "Product Photography & Models",
                    timeScope: "Feb 10 – Feb 14",
                    description: "Create high-quality product images, model shots, and texture close-ups. Include before-and-after visuals and highlight key benefits in each creative.",
                },
                {
                    number: 2,
                    title: "Upload Products to Shopify",
                    timeScope: "Feb 14 – Feb 17",
                    description: "Upload all new products to Shopify with proper tags, collections, descriptions, pricing, and all creative assets assigned to each listing.",
                },
            ],
        },
        {
            id: "homepage",
            label: "Homepage Redesign",
            estimateRate: "",
            steps: [
                {
                    number: 1,
                    title: "Redesign Homepage Layout",
                    timeScope: "Feb 17 – Feb 20",
                    description: "Restructure the homepage to link directly to collections, feature best-selling and popular products, highlight skin concerns, and include clear CTAs throughout.",
                },
                {
                    number: 2,
                    title: "SEO & Final Polish",
                    timeScope: "Feb 20 – Feb 23",
                    description: "Optimize all pages for search engines — meta titles, descriptions, alt tags, and structured data. Ensure the site loads fast and is fully mobile responsive.",
                },
            ],
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
        serviceOptions.forEach(option => {
            checkScrollPosition(option.id);
        });
    }, [selectedTab]);

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
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        Object.values(sectionRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            Object.values(sectionRefs.current).forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className="proposal-scp">
            <div className="proposal-scp__container">
                <div className="proposal-scp__logo">
                    <img className="proposal-scp__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                <div
                    className={`proposal-scp__hero ${visibleSections.has('hero') ? 'proposal-scp__hero--visible' : ''}`}
                    data-section-id="hero"
                    ref={(el) => (sectionRefs.current['hero'] = el)}
                >
                    <h1 className="proposal-scp__hero-title">Skin Cosmetics Pro</h1>
                    <h3 className="proposal-scp__hero-subtitle">Gameplan: January 31 – February 23</h3>
                </div>

                {/* Gameplan Intro */}
                <div
                    className={`proposal-scp__section ${visibleSections.has('gameplan-intro') ? 'proposal-scp__section--visible' : ''}`}
                    data-section-id="gameplan-intro"
                    ref={(el) => (sectionRefs.current['gameplan-intro'] = el)}
                >
                    <h4 className="proposal-scp__section-subheading">The Gameplan</h4>
                    <h2 className="proposal-scp__section-subtitle">
                        Here's the plan to elevate the Skin Cosmetics Pro website — organized collections, redesigned product pages, professional creatives, and an optimized homepage.
                    </h2>
                </div>

                {/* Gameplan Steps Overview */}
                <section className="proposal-scp__section-main">
                    <div
                        className={`proposal-scp__section-line ${visibleSections.has('step-1') ? 'proposal-scp__section-line--visible' : ''}`}
                        data-section-id="step-1"
                        ref={(el) => (sectionRefs.current['step-1'] = el)}
                    >
                        <h3 className="proposal-scp__section-line-title">1. Create Product Collections</h3>
                        <p className="proposal-scp__section-line-text">
                            Organize products by brand, product type, and skin concern so clients can easily find what they need.
                        </p>
                    </div>

                    <div
                        className={`proposal-scp__section-line ${visibleSections.has('step-2') ? 'proposal-scp__section-line--visible' : ''}`}
                        data-section-id="step-2"
                        ref={(el) => (sectionRefs.current['step-2'] = el)}
                    >
                        <h3 className="proposal-scp__section-line-title">2. Restructure Product Pages</h3>
                        <p className="proposal-scp__section-line-text">
                            Redesign each product page to include detailed descriptions, targeting info, ingredients, how-to instructions, and product videos.
                        </p>
                    </div>

                    <div
                        className={`proposal-scp__section-line ${visibleSections.has('step-3') ? 'proposal-scp__section-line--visible' : ''}`}
                        data-section-id="step-3"
                        ref={(el) => (sectionRefs.current['step-3'] = el)}
                    >
                        <h3 className="proposal-scp__section-line-title">3. Create Product Creatives</h3>
                        <p className="proposal-scp__section-line-text">
                            Produce product images, model shots, before-and-afters, textures, and benefit highlights. Upload everything to Shopify with proper tags and pricing.
                        </p>
                    </div>

                    <div
                        className={`proposal-scp__section-line ${visibleSections.has('step-4') ? 'proposal-scp__section-line--visible' : ''}`}
                        data-section-id="step-4"
                        ref={(el) => (sectionRefs.current['step-4'] = el)}
                    >
                        <h3 className="proposal-scp__section-line-title">4. Redesign Homepage</h3>
                        <p className="proposal-scp__section-line-text">
                            Link to collections, feature best sellers, highlight skin concerns, and add clear CTAs throughout the homepage.
                        </p>
                    </div>
                </section>

                {/* References */}
                <div
                    className={`proposal-scp__section ${visibleSections.has('references') ? 'proposal-scp__section--visible' : ''}`}
                    data-section-id="references"
                    ref={(el) => (sectionRefs.current['references'] = el)}
                >
                    <h4 className="proposal-scp__section-subheading">Inspiration & References</h4>
                    <div className="proposal-scp__references">
                        <a href="https://www.shiseido.com/us/en/shiseido-men-energizing-moisturizer-extra-light-fluid-0729238171541.html?cgid=men" target="_blank" rel="noopener noreferrer" className="proposal-scp__reference-link">
                            Shiseido — Product page layout & detail structure
                        </a>
                        <a href="https://theordinary.com/en-us" target="_blank" rel="noopener noreferrer" className="proposal-scp__reference-link">
                            The Ordinary — Clean design, ingredient-forward approach
                        </a>
                    </div>
                </div>

                {/* Detailed Steps Carousel */}
                <section className="proposal-scp__services">
                    <div
                        className={`proposal-scp__services-header ${visibleSections.has('services-header') ? 'proposal-scp__services-header--visible' : ''}`}
                        data-section-id="services-header"
                        ref={(el) => (sectionRefs.current['services-header'] = el)}
                    >
                        <h4 className="proposal-scp__section-subheading">The Breakdown</h4>
                        <h2 className="proposal-scp__section-subtitle">Here's a detailed look at each phase of the gameplan.</h2>
                    </div>

                    <div className="proposal-scp__tabs">
                        {serviceOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`proposal-scp__tab ${selectedTab === option.id ? 'proposal-scp__tab--active' : ''}`}
                                onClick={() => setSelectedTab(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <div className="proposal-scp__carousel-container">
                        {serviceOptions.map((option) => (
                            <div key={option.id}>
                                <div
                                    className={`proposal-scp__carousel-wrapper ${selectedTab === option.id ? 'proposal-scp__carousel-wrapper--active' : ''}`}
                                >
                                    <button
                                        className="proposal-scp__carousel-arrow proposal-scp__carousel-arrow--left"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                        aria-label="Scroll left"
                                    >
                                        <IconChevronLeft size={20} />
                                    </button>

                                    <div
                                        className="proposal-scp__carousel"
                                        ref={(el) => (carouselRefs.current[option.id] = el)}
                                    >
                                        {option.steps.map((step) => (
                                            <div key={step.number} className="proposal-scp__card">
                                                <div className="proposal-scp__card-number">
                                                    <span className="proposal-scp__card-number-text">{step.number}</span>
                                                </div>
                                                <h3 className="proposal-scp__card-title">{step.title}</h3>
                                                <p className="proposal-scp__card-time">{step.timeScope}</p>
                                                <p className="proposal-scp__card-description">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="proposal-scp__carousel-arrow proposal-scp__carousel-arrow--right"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'right', option.id)}
                                        aria-label="Scroll right"
                                    >
                                        <IconChevronRight size={20} />
                                    </button>
                                </div>

                                {selectedTab === option.id && (
                                    <div className="proposal-scp__carousel-nav">
                                        <button
                                            className={`proposal-scp__carousel-nav-button ${!scrollStates[option.id]?.canScrollLeft ? 'proposal-scp__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                            disabled={!scrollStates[option.id]?.canScrollLeft}
                                            aria-label="Scroll left"
                                        >
                                            <IconChevronLeft size={20} />
                                        </button>
                                        <button
                                            className={`proposal-scp__carousel-nav-button ${!scrollStates[option.id]?.canScrollRight ? 'proposal-scp__carousel-nav-button--disabled' : ''}`}
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

                {/* Goals Section */}
                <div
                    className={`proposal-scp__section ${visibleSections.has('goals') ? 'proposal-scp__section--visible' : ''}`}
                    data-section-id="goals"
                    ref={(el) => (sectionRefs.current['goals'] = el)}
                >
                    <h4 className="proposal-scp__section-subheading">Goals</h4>
                    <div className="proposal-scp__section-bullet-item">
                        <span className="proposal-scp__section-bullet"></span>
                        <p className="proposal-scp__section-text">Improve SEO — increase Google search visibility for skincare professional products</p>
                    </div>
                    <div className="proposal-scp__section-bullet-item">
                        <span className="proposal-scp__section-bullet"></span>
                        <p className="proposal-scp__section-text">Increase website traffic through organic search and better discoverability</p>
                    </div>
                    <div className="proposal-scp__section-bullet-item">
                        <span className="proposal-scp__section-bullet"></span>
                        <p className="proposal-scp__section-text">Build credibility and trust with detailed product information, ingredients, and professional imagery</p>
                    </div>
                    <div className="proposal-scp__section-bullet-item">
                        <span className="proposal-scp__section-bullet"></span>
                        <p className="proposal-scp__section-text">Attract and retain cosmetologists and estheticians by providing the professional-grade information they expect</p>
                    </div>
                    <div className="proposal-scp__section-bullet-item">
                        <span className="proposal-scp__section-bullet"></span>
                        <p className="proposal-scp__section-text">Increase conversion rate with clear product pages, organized collections, and strong CTAs</p>
                    </div>
                    <div className="proposal-scp__section-bullet-item">
                        <span className="proposal-scp__section-bullet"></span>
                        <p className="proposal-scp__section-text">Position Skin Cosmetics Pro as a trusted source for professional skincare products</p>
                    </div>
                </div>

                {/* Next Steps */}
                <div
                    className={`proposal-scp__section ${visibleSections.has('next-steps') ? 'proposal-scp__section--visible' : ''}`}
                    data-section-id="next-steps"
                    ref={(el) => (sectionRefs.current['next-steps'] = el)}
                >
                    <h4 className="proposal-scp__section-subheading">Next Steps</h4>
                    <h2 className="proposal-scp__section-subtitle">Let's get in touch and start creating together.</h2>
                    <div className="proposal-scp__section-links">
                        <a href="tel:+19085604930" className="contact__email-button">
                            +1 908-560-4930
                        </a>
                        <a href="mailto:hello@zenflostudios.com" className="contact__email-button">
                            hello@zenflostudios.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalSCP;
