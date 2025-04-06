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
                   
                    <h1 className='hero-title'>We design your vision, watch it grow in the world </h1>
                    <h3 className="hero-subtitle">
                        We create high quality content to impulse your brand
                    </h3>
                    <h4 className='hero-heading'>design and develop studio</h4>
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