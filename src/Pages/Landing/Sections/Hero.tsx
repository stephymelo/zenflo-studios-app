import { useEffect, useRef, useState } from 'react';

export const Hero = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [hasScrolledAway, setHasScrolledAway] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(true);
    const heroRef = useRef<HTMLDivElement>(null);
    const lastScrollYRef = useRef(0);
    const morphIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const actualText = "A Design + Development Studio";
    const characters = "01"; // Only binary characters

    // Morphing text animation on initial load
    useEffect(() => {
        let iteration = 0;

        // Get all valid indices (excluding spaces and "+") and shuffle them
        const validIndices: number[] = [];
        for (let i = 0; i < actualText.length; i++) {
            if (actualText[i] !== " " && actualText[i] !== "+") {
                validIndices.push(i);
            }
        }

        // Shuffle the valid indices for random reveal order
        const shuffledIndices = [...validIndices].sort(() => Math.random() - 0.5);
        const revealSpeed = 3; // Number of characters to reveal per iteration

        const interval = setInterval(() => {
            // Calculate how many characters should be revealed by now
            const revealCount = Math.min(shuffledIndices.length, iteration * revealSpeed);
            const revealedIndices = new Set(shuffledIndices.slice(0, revealCount));

            setDisplayText(
                actualText
                    .split("")
                    .map((char, index) => {
                        if (char === " " || char === "+") return char;
                        if (revealedIndices.has(index)) {
                            return actualText[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (revealCount >= shuffledIndices.length || iteration > 15) {
                clearInterval(interval);
                setDisplayText(actualText);
                setIsAnimating(false);
            }

            iteration++;
        }, 80);

        return () => clearInterval(interval);
    }, []);

    // Trigger morphing animation
    const startMorphing = () => {
        // Clear any existing interval to prevent memory leaks
        if (morphIntervalRef.current) {
            clearInterval(morphIntervalRef.current);
        }

        setIsAnimating(true);
        let iteration = 0;

        // Get all valid indices (excluding spaces and "+") and shuffle them
        const validIndices: number[] = [];
        for (let i = 0; i < actualText.length; i++) {
            if (actualText[i] !== " " && actualText[i] !== "+") {
                validIndices.push(i);
            }
        }

        // Shuffle the valid indices for random reveal order
        const shuffledIndices = [...validIndices].sort(() => Math.random() - 0.5);
        const revealSpeed = 3;

        morphIntervalRef.current = setInterval(() => {
            // Calculate how many characters should be revealed by now
            const revealCount = Math.min(shuffledIndices.length, iteration * revealSpeed);
            const revealedIndices = new Set(shuffledIndices.slice(0, revealCount));

            setDisplayText(
                actualText
                    .split("")
                    .map((char, index) => {
                        if (char === " " || char === "+") return char;
                        if (revealedIndices.has(index)) {
                            return actualText[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (revealCount >= shuffledIndices.length || iteration > 15) {
                if (morphIntervalRef.current) {
                    clearInterval(morphIntervalRef.current);
                    morphIntervalRef.current = null;
                }
                setDisplayText(actualText);
                setIsAnimating(false);
            }

            iteration++;
        }, 80);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollYRef.current;
            const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;

            // User scrolled down past the entire hero section
            if (currentScrollY > heroHeight) {
                if (!hasScrolledAway) {
                    setHasScrolledAway(true);
                }
                setIsVisible(false);
            }

            // User scrolled back up to the top after scrolling away
            if (isScrollingUp && hasScrolledAway && currentScrollY < heroHeight * 0.5) {
                setIsVisible(true);
                startMorphing();
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Clean up morph interval on unmount
            if (morphIntervalRef.current) {
                clearInterval(morphIntervalRef.current);
            }
        };
    }, [hasScrolledAway]);
    return (
        <section className="hero" ref={heroRef}>
            {/* <div className="hero-background">
                <img src={heroBg} alt="Design team working" className="hero-bg-image" />
            </div> */}
            <div className="hero-overlay">
                <div className="hero-content-wrapper">
                    <h4 className={`hero-heading ${isVisible ? 'animate' : ''} ${isAnimating ? 'morphing' : ''}`}>
                        {displayText}
                    </h4>
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