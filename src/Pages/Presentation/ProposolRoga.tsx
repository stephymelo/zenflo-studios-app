import { useEffect, useRef, useState } from "react";
import logo from '../../Assets/Logo/loguito.svg';
import roga from '../../Assets/Proposol/roga-ear.png';
import "./_proposolroga.scss";

interface ChartData {
    label: string;
    percentage: number;
    color: string;
}

const ProposolRoga = () => {
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    const chartData: ChartData[] = [
        { label: "direct", percentage: 79.71, color: "#49D3BA" },
        { label: "search", percentage: 6.82, color: "#55a4a4ff" },
        { label: "social", percentage: 6.82, color: "#ff9580ff" },
        { label: "referrals", percentage: 5.11, color: "#5A9B7D" },
        { label: "paidReferrals", percentage: 1.48, color: "#E89B7C" },
        { label: "mail", percentage: 0.06, color: "#3eb367ff" },
    ];

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

                <div className="proposol__hero">
                    <h1 className="proposol__hero-title">Hey there Roga.ai</h1>
                    <h3 className="proposol__hero-subtitle">We are Zenflo, keep scrolling down to see what we found about you.</h3>
                </div>

                <div className="proposol__section">
                    <h4 className="proposol__section-subheading">What it is</h4>
                     <h2 className="proposol__section-subtitle">Roga is a device that stimulates the vagus nerve to help manage stress, improve sleep and even help you focus.</h2>
                    <p className="proposol__section-text"> It's very easy to use and has an app that controls the device and offers different meditation content.</p>
                    <div className="proposol__section-image">
                        <img className="proposol__section-img" src={roga} alt="Roga product" />
                    </div>
                </div>

                <div className="proposol__section">
                    <h4 className="proposol__section-subheading">What else did we find?</h4>
                    <p className="proposol__section-text">Your store is built on Shopify — that's great! Shopify offers powerful tools to connect and streamline leads from social media and search engines, plus seamless email marketing flows through its built-in system or integrations like Mailchimp.</p>
                </div>

                <div className="proposol__section">
                    <h4 className="proposol__section-subheading">Some actual data</h4>
                    <p className="proposol__section-text">We saw that you had approximately 2k visits this last month. Your top keywords were:</p>
                    <p className="proposol__section-text">"Roga startup" and "Roga"</p>
                </div>

                <div className="proposol__section">
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

                    <div className="proposol__section">
                        <h4 className="proposol__section-subheading">Quick assestment</h4>
                        <p className="proposol__section-text">Non-consistent branding</p>
                        <p className="proposol__section-text">Views are low for the mayority of videos, some had a really good perfomance</p>
                    </div>

                    <div className="proposol__section">
                        <h4 className="proposol__section-subheading">The gameplan</h4>
                        <h2 className="proposol__section-subtitle">We want the world to know the value of your product, and that means starting with the basics. Here are some the things we can start off with.</h2>
                    </div>

                    <div className="proposol__section-line">
                        <h3 className="proposol__section-line-title">Defining the brand identity</h3>
                        <p className="proposol__section-line-text">Using what you have defined in terms of look and feel and messaging from your product, packaging and website, we need to connect that with your socials.</p>
                    </div>

                    <div className="proposol__section-line">
                        <h3 className="proposol__section-line-title">Understand your market</h3>
                        <p className="proposol__section-line-text">A little bit of research is always needed before designing. Understanding the market, defining your target audience. As previously mentioned, its women in their 30's to 40's, they like to meditate, do yoga, take care of themselves to try to live a stress free life. We will create a buyer persona based on this and our own research to always have them in mind when designing. We will also look for people and have them on hand for any photographic, videographic material needed.</p>
                    </div>

                    <div className="proposol__section-line">
                        <h3 className="proposol__section-line-title">The gameplan</h3>
                        <p className="proposol__section-line-text">We will create a gameplan for a 3 month campaign, have a consistent posting schedule, having the content planned out and assets filed.</p>
                    </div>

                </section>
            </div>
        </div>
    );
};

export default ProposolRoga;
