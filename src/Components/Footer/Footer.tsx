import React from "react";
import leaf from '../../Assets/Media/leaf-zen.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">

                <hr className="footer__divider"></hr>

                <div className="footer__cta">
                    <h2>
                        Ready to grow your business?<br />
                       <a className="cta-green" href="/contact"> Let's do it </a>
                        <img
                            src={leaf}
                            alt="Leaf icon"
                            className="leaf-icon"
                        />
                    </h2>
                </div>

                <div className="footer__content">
                    <div className="link-section">
                        <div className="linkGroup">
                            <h4 className="sectionTitle">Address</h4>
                            <p>Boca Raton, Florida</p>
                            <p>+1 908 460 5930</p>
                            <a href="mailto:hello@zenflostudios.com">hello@zenflostudios.com</a>
                        </div>


                    </div>
                    <div className="right-column">

                        <div className="socialSection">
                            <h4 className="sectionTitle">Social</h4>
                            <div className="socialLinks">
                                <a href="https://x.com/ZenfloStudios" target="_blank" rel="noopener noreferrer">X: @zenflostudios</a>
                                <a href="https://instagram.com/zenflo.studios" target="_blank" rel="noopener noreferrer">Instagram: @zenflostudios</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    <p className="footer__copyright-item">Zenflo Studios {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;