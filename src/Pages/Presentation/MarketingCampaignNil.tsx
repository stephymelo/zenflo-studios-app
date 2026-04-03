import { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconCalendarEvent, IconTarget, IconVideo, IconBrandInstagram, IconTruck, IconHeadset, IconPackage, IconClock, IconChevronDown } from '@tabler/icons-react';
import logo from '../../Assets/Logo/loguito.svg';
import './_marketingcampaignnil.scss';

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

interface CalendarWeek {
    week: number;
    dates: string;
    content: string[];
    reels: string;
    focus: string;
}

interface KPI {
    metric: string;
    current: string;
    target: string;
    icon: string;
}

const MarketingCampaignNil = () => {
    const [selectedTab, setSelectedTab] = useState("month1");
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
    const [scrollStates, setScrollStates] = useState<{ [key: string]: { canScrollLeft: boolean; canScrollRight: boolean } }>({});
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const calendarData: CalendarWeek[][] = [
        // MONTH 1 — April 2026: Foundation & Education Launch
        [
            { week: 1, dates: "Apr 1 – Apr 7", content: ["Reel: What is a hair system? Intro to wigs vs. toppers vs. extensions", "Reel: Our warehouse — behind the scenes USA packing & shipping", "Blog/Caption: Why USA-based customer support matters"], reels: "2 Reels + 1 Carousel", focus: "Brand Introduction" },
            { week: 2, dates: "Apr 8 – Apr 14", content: ["Reel: How to measure your head for a wig (step-by-step)", "Reel: Synthetic vs. Human Hair — what's the difference?", "Post: Feature spotlight — ladies synthetic hair collection"], reels: "2 Reels + 1 Static", focus: "Education — Hair Types" },
            { week: 3, dates: "Apr 15 – Apr 21", content: ["Reel: How to apply a lace front wig (beginner-friendly tutorial)", "Reel: Salon owner Q&A — Why stock hair systems?", "Post: Custom orders explained — your style in 6–8 weeks"], reels: "2 Reels + 1 Carousel", focus: "Application Methods" },
            { week: 4, dates: "Apr 22 – Apr 28", content: ["Reel: Unboxing — see how we pack with care", "Reel: Men's hair systems — breaking the stigma", "Post: Month 1 recap + customer testimonial feature"], reels: "2 Reels + 1 Static", focus: "Trust & Social Proof" },
        ],
        // MONTH 2 — May 2026: Product Deep Dives & Community Building
        [
            { week: 5, dates: "May 1 – May 7", content: ["Reel: Hair extension application methods — clip-in, tape-in, sew-in", "Reel: How to wash and maintain your hair system", "Post: Product spotlight — shampoos & aftercare essentials"], reels: "2 Reels + 1 Carousel", focus: "Extensions & Maintenance" },
            { week: 6, dates: "May 8 – May 14", content: ["Reel: Salon setup — everything you need from one supplier", "Reel: How to customize a wig for your client (cutting & styling tips)", "Post: Feature — we carry everything for your salon needs"], reels: "2 Reels + 1 Static", focus: "Salon Solutions" },
            { week: 7, dates: "May 15 – May 21", content: ["Reel: Before & After transformation — men's hair system", "Reel: How to secure a hair system with adhesive vs. tape", "Post: Customer story — real results, real confidence"], reels: "2 Reels + 1 Carousel", focus: "Transformations" },
            { week: 8, dates: "May 22 – May 28", content: ["Reel: Why quality matters — cheap vs. premium hair comparison", "Reel: Our custom order process — from consultation to delivery", "Post: Month 2 recap + engagement poll (what content do you want?)"], reels: "2 Reels + 1 Static", focus: "Quality & Value" },
        ],
        // MONTH 3 — June 2026: Conversion & Customer Acquisition
        [
            { week: 9, dates: "Jun 1 – Jun 7", content: ["Reel: 5 reasons salons choose us over competitors", "Reel: How to color and blend a hair system seamlessly", "Post: Website feature — new homepage sections & easier navigation"], reels: "2 Reels + 1 Carousel", focus: "Competitive Edge" },
            { week: 10, dates: "Jun 8 – Jun 14", content: ["Reel: Full client consultation walkthrough for hair replacement", "Reel: Hair care routine — products we recommend from our store", "Post: Spotlight — hair extensions collection for every texture"], reels: "2 Reels + 1 Static", focus: "Expert Authority" },
            { week: 11, dates: "Jun 15 – Jun 21", content: ["Reel: Summer hair care — protecting your hair system in heat", "Reel: How we ship nationwide — fast, secure, packed with care", "Post: Limited-time bundle offer or promotion push"], reels: "2 Reels + 1 Promo", focus: "Seasonal & Promos" },
            { week: 12, dates: "Jun 22 – Jun 28", content: ["Reel: 3-month journey recap — our growth story", "Reel: Client testimonials compilation", "Post: Campaign results + what's next — teaser for next quarter"], reels: "2 Reels + 1 Carousel", focus: "Results & Future" },
        ],
    ];

    const kpis: KPI[] = [
        { metric: "Website Traffic", current: "Baseline", target: "+40% increase", icon: "traffic" },
        { metric: "Social Media Followers", current: "Baseline", target: "+500 new followers", icon: "followers" },
        { metric: "Reel Views (avg)", current: "Baseline", target: "5K+ avg views", icon: "views" },
        { metric: "Website Conversion Rate", current: "Baseline", target: "+15% improvement", icon: "conversion" },
        { metric: "Customer Inquiries", current: "Baseline", target: "+30% increase", icon: "inquiries" },
        { metric: "Returning Customers", current: "Baseline", target: "+20% increase", icon: "returning" },
    ];

    const websiteIdeas = [
        { title: "Educational Video Hub", description: "Dedicated page with all tutorial reels organized by category — application methods, maintenance, styling tips. Keeps visitors on-site longer and builds authority." },
        { title: "Before & After Gallery", description: "Showcase real transformations with client permission. Nothing sells like visual proof. Include the product used in each transformation." },
        { title: "Hair System Finder Quiz", description: "Interactive quiz that asks about hair type, lifestyle, budget, and recommends the right product. Captures emails and guides new customers to purchase." },
        { title: "Trust Banner on Homepage", description: "Prominent section highlighting: USA Warehouse, USA Customer Support, Packed with Care, Free Shipping threshold. Builds instant credibility." },
        { title: "Custom Order CTA Section", description: "Dedicated homepage section explaining the custom order process with a clear timeline (6–8 weeks) and a 'Start Your Custom Order' button." },
        { title: "Salon Partner Program Page", description: "Page targeting salon owners — bulk pricing info, why to partner with us, application form. Converts B2B leads." },
        { title: "Product Bundles & Kits", description: "Pre-built bundles (starter kit, maintenance kit, salon essentials) at a slight discount. Increases average order value." },
        { title: "Customer Reviews Section", description: "Prominently display reviews on homepage and product pages. Add a 'Share Your Story' submission form to collect UGC." },
        { title: "Blog / Learning Center", description: "SEO-optimized articles on hair care, application guides, trend reports. Drives organic traffic from Google searches." },
        { title: "Live Chat or WhatsApp Widget", description: "Instant support builds trust, especially for first-time buyers spending on premium products. Reduces cart abandonment." },
    ];

    const serviceOptions: ServiceOption[] = [
        {
            id: "month1",
            label: "Month 1 — Foundation",
            estimateRate: "April 2026",
            steps: [
                { number: 1, title: "Brand Story & Introduction Content", timeScope: "Week 1 – 2", description: "Launch the campaign with content that introduces who we are — USA-based warehouse, customer support, and our commitment to packing with care. Establish trust and brand identity." },
                { number: 2, title: "Educational Reel Series: Hair Basics", timeScope: "Week 2 – 3", description: "Create short-form tutorials on hair types (synthetic vs. human), how to measure for a wig, and the difference between wigs, toppers, and extensions." },
                { number: 3, title: "Application Method Tutorials", timeScope: "Week 3 – 4", description: "Film step-by-step reels showing lace front application, tape-in extensions, and clip-in methods. Position the brand as the go-to educational resource." },
                { number: 4, title: "SEO & Analytics Baseline Setup", timeScope: "Week 1 – 4", description: "Isabella sets up tracking for all KPIs — website traffic, social engagement, conversion rates. Establish baseline metrics for the 3-month campaign." },
            ],
        },
        {
            id: "month2",
            label: "Month 2 — Growth",
            estimateRate: "May 2026",
            steps: [
                { number: 1, title: "Product Deep Dives & Salon Content", timeScope: "Week 5 – 6", description: "Highlight specific product lines — men's systems, ladies synthetic, extensions, shampoos. Show how salons can stock everything they need from one supplier." },
                { number: 2, title: "Transformation & Testimonial Reels", timeScope: "Week 6 – 7", description: "Film before/after transformations and client testimonials. Real results build trust and justify premium pricing. Emphasize quality over cheap alternatives." },
                { number: 3, title: "Custom Order Process Content", timeScope: "Week 7 – 8", description: "Walk through the custom order journey — consultation, measurements, production (6–8 weeks), delivery. Show the craftsmanship behind the premium price." },
                { number: 4, title: "Mid-Campaign SEO Review", timeScope: "Week 8", description: "Isabella reviews analytics — what content is performing, which pages are getting traffic, adjust strategy based on data. Optimize top-performing content." },
            ],
        },
        {
            id: "month3",
            label: "Month 3 — Conversion",
            estimateRate: "June 2026",
            steps: [
                { number: 1, title: "Competitive Advantage Content", timeScope: "Week 9 – 10", description: "Create content directly addressing why customers should choose us — quality comparison reels, salon testimonials, the full-service advantage of one supplier for everything." },
                { number: 2, title: "Website Enhancements Go Live", timeScope: "Week 9 – 10", description: "Stephanie launches new homepage sections — trust banners, video hub, before/after gallery, product bundles, and the hair system finder quiz." },
                { number: 3, title: "Promotion & Conversion Push", timeScope: "Week 11", description: "Launch a limited-time bundle promotion or first-order discount. Push through all channels — reels, stories, email, website banner. Drive conversions." },
                { number: 4, title: "Campaign Wrap-Up & Results", timeScope: "Week 12", description: "Compile 3-month results. Isabella presents analytics report — traffic growth, follower gains, conversion improvements. Plan next quarter based on learnings." },
            ],
        },
    ];

    const monthNames = ["April 2026", "May 2026", "June 2026"];

    const checkScrollPosition = (id: string) => {
        const ref = carouselRefs.current[id];
        if (!ref) return;
        const canScrollLeft = ref.scrollLeft > 0;
        const canScrollRight = ref.scrollLeft < (ref.scrollWidth - ref.clientWidth - 1);
        setScrollStates(prev => ({ ...prev, [id]: { canScrollLeft, canScrollRight } }));
    };

    const handleScroll = (ref: HTMLDivElement | null, direction: 'left' | 'right', id: string) => {
        if (!ref) return;
        const scrollAmount = ref.offsetWidth * 0.8;
        ref.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        setTimeout(() => checkScrollPosition(id), 300);
    };

    useEffect(() => {
        serviceOptions.forEach(option => { checkScrollPosition(option.id); });
    }, [selectedTab]);

    useEffect(() => {
        const listeners: { [key: string]: () => void } = {};
        serviceOptions.forEach(option => {
            const ref = carouselRefs.current[option.id];
            if (ref) {
                const listener = () => checkScrollPosition(option.id);
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
                    const sectionId = (entry.target as HTMLElement).dataset.sectionId;
                    if (sectionId) {
                        if (entry.isIntersecting) {
                            setVisibleSections(prev => new Set(prev).add(sectionId));
                        } else {
                            setVisibleSections(prev => { const s = new Set(prev); s.delete(sectionId); return s; });
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );
        Object.values(sectionRefs.current).forEach(ref => { if (ref) observer.observe(ref); });
        return () => { Object.values(sectionRefs.current).forEach(ref => { if (ref) observer.unobserve(ref); }); };
    }, []);

    return (
        <div className="campaign-nil">
            <div className="campaign-nil__container">
                <div className="campaign-nil__logo">
                    <img className="campaign-nil__logo-img" src={logo} alt="Zenflo Logo" />
                </div>

                {/* Hero */}
                <div
                    className={`campaign-nil__hero ${visibleSections.has('hero') ? 'campaign-nil__hero--visible' : ''}`}
                    data-section-id="hero"
                    ref={(el) => (sectionRefs.current['hero'] = el)}
                >
                    <h4 className="campaign-nil__hero-label">Marketing Campaign</h4>
                    <h1 className="campaign-nil__hero-title">NIL Hair</h1>
                    <h3 className="campaign-nil__hero-subtitle">3-Month Brand Awareness & Growth Campaign</h3>
                    <h3 className="campaign-nil__hero-dates">April – June 2026</h3>
                </div>

                {/* Mission */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('mission') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="mission"
                    ref={(el) => (sectionRefs.current['mission'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">The Mission</h4>
                    <h2 className="campaign-nil__section-subtitle">
                        Increase brand awareness, drive website traffic, and convert new customers through educational content that showcases our expertise, quality, and full-service hair solutions.
                    </h2>
                </div>

                {/* What Sets Us Apart */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('features') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="features"
                    ref={(el) => (sectionRefs.current['features'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">What Sets Us Apart</h4>
                    <div className="campaign-nil__features">
                        <div className="campaign-nil__feature">
                            <div className="campaign-nil__feature-icon"><IconTruck size={28} /></div>
                            <div className="campaign-nil__feature-content">
                                <h3 className="campaign-nil__feature-title">USA Shipping & Warehouse</h3>
                                <p className="campaign-nil__feature-text">Based in the USA with our own warehouse — fast, reliable domestic shipping on every order.</p>
                            </div>
                        </div>
                        <div className="campaign-nil__feature">
                            <div className="campaign-nil__feature-icon"><IconHeadset size={28} /></div>
                            <div className="campaign-nil__feature-content">
                                <h3 className="campaign-nil__feature-title">USA Customer Support</h3>
                                <p className="campaign-nil__feature-text">Real people, real support. Our team is here to help with product selection, orders, and aftercare.</p>
                            </div>
                        </div>
                        <div className="campaign-nil__feature">
                            <div className="campaign-nil__feature-icon"><IconPackage size={28} /></div>
                            <div className="campaign-nil__feature-content">
                                <h3 className="campaign-nil__feature-title">Packed with Care</h3>
                                <p className="campaign-nil__feature-text">Every order is carefully packaged to ensure your hair system arrives in perfect condition.</p>
                            </div>
                        </div>
                        <div className="campaign-nil__feature">
                            <div className="campaign-nil__feature-icon"><IconClock size={28} /></div>
                            <div className="campaign-nil__feature-content">
                                <h3 className="campaign-nil__feature-title">Custom Orders in 6–8 Weeks</h3>
                                <p className="campaign-nil__feature-text">Need something specific? Our custom order process delivers your perfect hair system with craftsmanship and precision.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Variety */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('variety') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="variety"
                    ref={(el) => (sectionRefs.current['variety'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Our Product Range</h4>
                    <h2 className="campaign-nil__section-subtitle">Everything your salon needs — from one trusted supplier.</h2>
                    <div className="campaign-nil__product-tags">
                        <span className="campaign-nil__product-tag">Ladies Synthetic Hair</span>
                        <span className="campaign-nil__product-tag">Ladies Human Hair</span>
                        <span className="campaign-nil__product-tag">Men's Human Hair Systems</span>
                        <span className="campaign-nil__product-tag">Hair Extensions</span>
                        <span className="campaign-nil__product-tag">Shampoos & Conditioners</span>
                        <span className="campaign-nil__product-tag">Adhesives & Tapes</span>
                        <span className="campaign-nil__product-tag">Styling Tools</span>
                        <span className="campaign-nil__product-tag">Aftercare Products</span>
                        <span className="campaign-nil__product-tag">Salon Essentials</span>
                    </div>
                </div>

                {/* Campaign Strategy Overview */}
                <section className="campaign-nil__section-main">
                    <div
                        className={`campaign-nil__section ${visibleSections.has('strategy-intro') ? 'campaign-nil__section--visible' : ''}`}
                        data-section-id="strategy-intro"
                        ref={(el) => (sectionRefs.current['strategy-intro'] = el)}
                    >
                        <h4 className="campaign-nil__section-subheading">Campaign Strategy</h4>
                        <h2 className="campaign-nil__section-subtitle">A 3-month content plan focused on education, trust-building, and conversion.</h2>
                    </div>

                    <div
                        className={`campaign-nil__section-line ${visibleSections.has('phase-1') ? 'campaign-nil__section-line--visible' : ''}`}
                        data-section-id="phase-1"
                        ref={(el) => (sectionRefs.current['phase-1'] = el)}
                    >
                        <h3 className="campaign-nil__section-line-title">Month 1: Foundation & Education Launch</h3>
                        <p className="campaign-nil__section-line-text">
                            Introduce the brand, establish trust with behind-the-scenes content, and launch the educational reel series teaching hair system basics and application methods.
                        </p>
                    </div>

                    <div
                        className={`campaign-nil__section-line ${visibleSections.has('phase-2') ? 'campaign-nil__section-line--visible' : ''}`}
                        data-section-id="phase-2"
                        ref={(el) => (sectionRefs.current['phase-2'] = el)}
                    >
                        <h3 className="campaign-nil__section-line-title">Month 2: Product Deep Dives & Community</h3>
                        <p className="campaign-nil__section-line-text">
                            Dive deep into product lines, showcase transformations, highlight the custom order process, and build community through engagement and testimonials.
                        </p>
                    </div>

                    <div
                        className={`campaign-nil__section-line ${visibleSections.has('phase-3') ? 'campaign-nil__section-line--visible' : ''}`}
                        data-section-id="phase-3"
                        ref={(el) => (sectionRefs.current['phase-3'] = el)}
                    >
                        <h3 className="campaign-nil__section-line-title">Month 3: Conversion & Customer Acquisition</h3>
                        <p className="campaign-nil__section-line-text">
                            Push for conversions with competitive content, website enhancements, promotions, and a strong call-to-action across all channels.
                        </p>
                    </div>
                </section>

                {/* Content Focus */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('content-focus') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="content-focus"
                    ref={(el) => (sectionRefs.current['content-focus'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Content Focus</h4>
                    <h2 className="campaign-nil__section-subtitle">Educational reels and short videos that teach, inspire, and convert.</h2>
                    <div className="campaign-nil__content-pillars">
                        <div className="campaign-nil__pillar">
                            <IconVideo size={24} />
                            <h3>Application Tutorials</h3>
                            <p>Step-by-step videos showing how to apply, secure, and style different hair systems and extensions.</p>
                        </div>
                        <div className="campaign-nil__pillar">
                            <IconBrandInstagram size={24} />
                            <h3>Behind the Scenes</h3>
                            <p>Warehouse tours, packing process, custom order production — show the care and quality behind every order.</p>
                        </div>
                        <div className="campaign-nil__pillar">
                            <IconTarget size={24} />
                            <h3>Product Education</h3>
                            <p>Hair type comparisons, maintenance guides, product spotlights — position the brand as the industry expert.</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Calendar */}
                <section className="campaign-nil__calendar-section">
                    <div
                        className={`campaign-nil__section ${visibleSections.has('calendar-header') ? 'campaign-nil__section--visible' : ''}`}
                        data-section-id="calendar-header"
                        ref={(el) => (sectionRefs.current['calendar-header'] = el)}
                    >
                        <h4 className="campaign-nil__section-subheading"><IconCalendarEvent size={18} /> Content Calendar</h4>
                        <h2 className="campaign-nil__section-subtitle">Week-by-week content plan. Click any week to expand details.</h2>
                    </div>

                    <div className="campaign-nil__calendar-tabs">
                        {monthNames.map((month, index) => (
                            <button
                                key={month}
                                className={`campaign-nil__calendar-tab ${selectedMonth === index ? 'campaign-nil__calendar-tab--active' : ''}`}
                                onClick={() => { setSelectedMonth(index); setExpandedWeek(null); }}
                            >
                                {month}
                            </button>
                        ))}
                    </div>

                    <div className="campaign-nil__calendar">
                        {calendarData[selectedMonth].map((week) => (
                            <div
                                key={week.week}
                                className={`campaign-nil__calendar-week ${expandedWeek === week.week ? 'campaign-nil__calendar-week--expanded' : ''}`}
                            >
                                <button
                                    className="campaign-nil__calendar-week-header"
                                    onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                                >
                                    <div className="campaign-nil__calendar-week-info">
                                        <span className="campaign-nil__calendar-week-number">Week {week.week}</span>
                                        <span className="campaign-nil__calendar-week-dates">{week.dates}</span>
                                        <span className="campaign-nil__calendar-week-focus">{week.focus}</span>
                                    </div>
                                    <div className="campaign-nil__calendar-week-meta">
                                        <span className="campaign-nil__calendar-week-reels">{week.reels}</span>
                                        <IconChevronDown
                                            size={18}
                                            className={`campaign-nil__calendar-week-chevron ${expandedWeek === week.week ? 'campaign-nil__calendar-week-chevron--rotated' : ''}`}
                                        />
                                    </div>
                                </button>
                                {expandedWeek === week.week && (
                                    <div className="campaign-nil__calendar-week-content">
                                        {week.content.map((item, i) => (
                                            <div key={i} className="campaign-nil__calendar-item">
                                                <span className="campaign-nil__calendar-item-bullet"></span>
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* KPIs & Goals */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('kpis') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="kpis"
                    ref={(el) => (sectionRefs.current['kpis'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Goals & KPIs</h4>
                    <h2 className="campaign-nil__section-subtitle">Brand awareness metrics we'll track throughout the campaign.</h2>
                    <div className="campaign-nil__kpis">
                        {kpis.map((kpi, index) => (
                            <div key={index} className="campaign-nil__kpi">
                                <h3 className="campaign-nil__kpi-metric">{kpi.metric}</h3>
                                <div className="campaign-nil__kpi-values">
                                    <div className="campaign-nil__kpi-value">
                                        <span className="campaign-nil__kpi-label">Start</span>
                                        <span className="campaign-nil__kpi-number">{kpi.current}</span>
                                    </div>
                                    <div className="campaign-nil__kpi-arrow">&#8594;</div>
                                    <div className="campaign-nil__kpi-value">
                                        <span className="campaign-nil__kpi-label">Target</span>
                                        <span className="campaign-nil__kpi-number campaign-nil__kpi-number--target">{kpi.target}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Breakdown Carousel */}
                <section className="campaign-nil__services">
                    <div
                        className={`campaign-nil__services-header ${visibleSections.has('services-header') ? 'campaign-nil__services-header--visible' : ''}`}
                        data-section-id="services-header"
                        ref={(el) => (sectionRefs.current['services-header'] = el)}
                    >
                        <h4 className="campaign-nil__section-subheading">The Breakdown</h4>
                        <h2 className="campaign-nil__section-subtitle">Detailed tasks for each month of the campaign.</h2>
                    </div>

                    <div className="campaign-nil__tabs">
                        {serviceOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`campaign-nil__tab ${selectedTab === option.id ? 'campaign-nil__tab--active' : ''}`}
                                onClick={() => setSelectedTab(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <div className="campaign-nil__carousel-container">
                        {serviceOptions.map((option) => (
                            <div key={option.id}>
                                <div className={`campaign-nil__carousel-wrapper ${selectedTab === option.id ? 'campaign-nil__carousel-wrapper--active' : ''}`}>
                                    <button
                                        className="campaign-nil__carousel-arrow campaign-nil__carousel-arrow--left"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                        aria-label="Scroll left"
                                    >
                                        <IconChevronLeft size={20} />
                                    </button>

                                    <div
                                        className="campaign-nil__carousel"
                                        ref={(el) => (carouselRefs.current[option.id] = el)}
                                    >
                                        {option.steps.map((step) => (
                                            <div key={step.number} className="campaign-nil__card">
                                                <div className="campaign-nil__card-number">
                                                    <span className="campaign-nil__card-number-text">{step.number}</span>
                                                </div>
                                                <h3 className="campaign-nil__card-title">{step.title}</h3>
                                                <p className="campaign-nil__card-time">{step.timeScope}</p>
                                                <p className="campaign-nil__card-description">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className="campaign-nil__carousel-arrow campaign-nil__carousel-arrow--right"
                                        onClick={() => handleScroll(carouselRefs.current[option.id], 'right', option.id)}
                                        aria-label="Scroll right"
                                    >
                                        <IconChevronRight size={20} />
                                    </button>
                                </div>

                                {selectedTab === option.id && (
                                    <div className="campaign-nil__carousel-nav">
                                        <button
                                            className={`campaign-nil__carousel-nav-button ${!scrollStates[option.id]?.canScrollLeft ? 'campaign-nil__carousel-nav-button--disabled' : ''}`}
                                            onClick={() => handleScroll(carouselRefs.current[option.id], 'left', option.id)}
                                            disabled={!scrollStates[option.id]?.canScrollLeft}
                                            aria-label="Scroll left"
                                        >
                                            <IconChevronLeft size={20} />
                                        </button>
                                        <button
                                            className={`campaign-nil__carousel-nav-button ${!scrollStates[option.id]?.canScrollRight ? 'campaign-nil__carousel-nav-button--disabled' : ''}`}
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

                {/* Team Responsibilities */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('team') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="team"
                    ref={(el) => (sectionRefs.current['team'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Team Responsibilities</h4>
                    <h2 className="campaign-nil__section-subtitle">What we need from each team member to execute this campaign.</h2>

                    <div className="campaign-nil__team">
                        <div className="campaign-nil__team-member">
                            <h3 className="campaign-nil__team-name">Isabella</h3>
                            <p className="campaign-nil__team-role">SEO & Analytics</p>
                            <ul className="campaign-nil__team-tasks">
                                <li>Set up and monitor Google Analytics & Search Console</li>
                                <li>Track all campaign KPIs weekly</li>
                                <li>Research target keywords for hair systems, wigs, extensions</li>
                                <li>Optimize all blog posts and product pages for SEO</li>
                                <li>Write meta titles, descriptions, and alt tags</li>
                                <li>Provide monthly analytics reports with actionable insights</li>
                                <li>Monitor competitor SEO strategies</li>
                                <li>Set up UTM tracking for all campaign links</li>
                            </ul>
                        </div>

                        <div className="campaign-nil__team-member">
                            <h3 className="campaign-nil__team-name">Kayla & Claire</h3>
                            <p className="campaign-nil__team-role">Editing & Filming</p>
                            <ul className="campaign-nil__team-tasks">
                                <li>Film 2 educational reels per week (8 per month)</li>
                                <li>Edit all video content with captions, music, and branding</li>
                                <li>Film behind-the-scenes warehouse and packing footage</li>
                                <li>Capture before & after transformation content</li>
                                <li>Create static posts, carousels, and story content</li>
                                <li>Film client testimonials and salon partner features</li>
                                <li>Maintain consistent visual style across all content</li>
                                <li>Deliver final edits 2 days before scheduled post date</li>
                            </ul>
                        </div>

                        <div className="campaign-nil__team-member">
                            <h3 className="campaign-nil__team-name">Stephanie</h3>
                            <p className="campaign-nil__team-role">Website</p>
                            <ul className="campaign-nil__team-tasks">
                                <li>Build educational video hub page on website</li>
                                <li>Add trust banner section to homepage (USA warehouse, support, packing)</li>
                                <li>Create before & after gallery page</li>
                                <li>Build hair system finder quiz for lead capture</li>
                                <li>Add custom order CTA section to homepage</li>
                                <li>Create salon partner program page</li>
                                <li>Set up product bundle/kit pages</li>
                                <li>Add customer review sections to homepage and product pages</li>
                                <li>Create blog/learning center for SEO content</li>
                                <li>Implement live chat or WhatsApp widget</li>
                                <li>Optimize website speed and mobile experience</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Website Ideas */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('website-ideas') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="website-ideas"
                    ref={(el) => (sectionRefs.current['website-ideas'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Website Enhancement Ideas</h4>
                    <h2 className="campaign-nil__section-subtitle">Additions to the homepage and website to drive traffic, build trust, and increase conversions.</h2>

                    <div className="campaign-nil__ideas">
                        {websiteIdeas.map((idea, index) => (
                            <div key={index} className="campaign-nil__idea">
                                <div className="campaign-nil__idea-number">{index + 1}</div>
                                <div className="campaign-nil__idea-content">
                                    <h3 className="campaign-nil__idea-title">{idea.title}</h3>
                                    <p className="campaign-nil__idea-description">{idea.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Value Proposition — Why We're Worth It */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('value') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="value"
                    ref={(el) => (sectionRefs.current['value'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Why Quality Over Price</h4>
                    <h2 className="campaign-nil__section-subtitle">Messaging framework to justify premium pricing and win new customers.</h2>
                    <div className="campaign-nil__value-points">
                        <div className="campaign-nil__section-bullet-item">
                            <span className="campaign-nil__section-bullet"></span>
                            <p className="campaign-nil__section-text"><strong>Education-first approach:</strong> Customers who understand the product are willing to pay more. Our tutorials show the quality difference.</p>
                        </div>
                        <div className="campaign-nil__section-bullet-item">
                            <span className="campaign-nil__section-bullet"></span>
                            <p className="campaign-nil__section-text"><strong>Show, don't tell:</strong> Before/after transformations and quality comparison reels let the product speak for itself.</p>
                        </div>
                        <div className="campaign-nil__section-bullet-item">
                            <span className="campaign-nil__section-bullet"></span>
                            <p className="campaign-nil__section-text"><strong>Full-service convenience:</strong> One supplier for everything — hair, extensions, shampoos, tools. Save time and shipping costs.</p>
                        </div>
                        <div className="campaign-nil__section-bullet-item">
                            <span className="campaign-nil__section-bullet"></span>
                            <p className="campaign-nil__section-text"><strong>USA-based trust signals:</strong> Domestic warehouse, real customer support, careful packaging — not a faceless overseas supplier.</p>
                        </div>
                        <div className="campaign-nil__section-bullet-item">
                            <span className="campaign-nil__section-bullet"></span>
                            <p className="campaign-nil__section-text"><strong>Custom craftsmanship:</strong> 6–8 week custom orders show dedication to quality. Highlight the process in content.</p>
                        </div>
                        <div className="campaign-nil__section-bullet-item">
                            <span className="campaign-nil__section-bullet"></span>
                            <p className="campaign-nil__section-text"><strong>Social proof:</strong> Real testimonials, real results. Every happy customer is a marketing asset.</p>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div
                    className={`campaign-nil__section ${visibleSections.has('next-steps') ? 'campaign-nil__section--visible' : ''}`}
                    data-section-id="next-steps"
                    ref={(el) => (sectionRefs.current['next-steps'] = el)}
                >
                    <h4 className="campaign-nil__section-subheading">Next Steps</h4>
                    <h2 className="campaign-nil__section-subtitle">Let's get in touch and start creating together.</h2>
                    <div className="campaign-nil__section-links">
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

export default MarketingCampaignNil;
