import Button from '../../../Components/Button/Button';
import heroBg from '../../../Assets/Media/bamboo-hero.svg';

export const Hero = () => {
    return (
        <section className="hero">
            {/* <div className="hero-background">
                <img src={heroBg} alt="Design team working" className="hero-bg-image" />
            </div> */}
            <div className="hero-overlay">
                <div className="hero-content">
                <h4 className='hero-heading'>Design and Development Studio</h4>
                    <h1 className='hero-title'>We build your vision,<br/> you watch it grow </h1>
                    <h3 className="hero-subtitle">
                    We help businesses shape their identity and elevate it through websites, digital content, and strategic design.
                    </h3>
                   
                    <div className="cta-group">
                        <Button variant="solid" size="lg">
                            Book us
                        </Button>
                       
                    </div>
                </div>
                <img src={heroBg} alt="Design team working" className="hero-bamboo-image" />
            </div>
        </section>
    );
};