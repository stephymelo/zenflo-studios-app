import Button from '../../../Components/Button/Button';
import heroBg from '../../../Assets/Media/hero-bg.jpg';

export const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <img src={heroBg} alt="Design team working" className="hero-bg-image" />
            </div>
            <div className="hero-overlay">
                <div className="hero-content">
                    <h4 className='hero-heading'>Design Studio</h4>
                    <h1 className='hero-title'>Design services for your brand</h1>
                    <p className="hero-subtitle">
                        We create high quality content to impulse your brand
                    </p>
                    <div className="cta-group">
                        <Button variant="solid" size="lg">
                            Book us
                        </Button>
                        <Button variant="outline" size="lg">
                            How it works
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};