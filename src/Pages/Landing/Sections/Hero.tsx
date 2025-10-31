import { useEffect, useRef, useState } from 'react';

export const Hero = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [hasScrolledAway, setHasScrolledAway] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const lastScrollYRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollYRef.current;
            const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;

            // User scrolled down past the entire hero section
            if (currentScrollY > heroHeight) {
                if (!hasScrolledAway) {
                    console.log('Scrolled away from hero');
                    setHasScrolledAway(true);
                }
                setIsVisible(false);
            }

            // User scrolled back up to the top after scrolling away
            if (isScrollingUp && hasScrolledAway && currentScrollY < heroHeight * 0.5) {
                console.log('Animating hero heading!');
                setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolledAway]);
    return (
        <section className="hero" ref={heroRef}>
            {/* <div className="hero-background">
                <img src={heroBg} alt="Design team working" className="hero-bg-image" />
            </div> */}
            <div className="hero-overlay">
                <div className="hero-content-wrapper">
                    <h4 className={`hero-heading ${isVisible ? 'animate' : ''}`}>A Design + Development Studio</h4>
                    <div className="hero-content-row">
                        <div className="hero-content-left">
                            <h1 className='hero-title'>We build your vision,<br/> you watch it grow </h1>
                        </div>
                        <div className="hero-content-right">
                            <h3 className={`hero-subtitle ${isVisible ? 'animate' : ''}`}>
                            We help businesses shape their identity and elevate it through websites, digital content, and strategic design that bring their story to life and build meaningful connections with their audience.
                            </h3>
                        </div>
                    </div>
                </div>
                {/* <img src={heroBg} alt="Design team working" className="hero-bamboo-image" /> */}
            </div>
        </section>
    );
};