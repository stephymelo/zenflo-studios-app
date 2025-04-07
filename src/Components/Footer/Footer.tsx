import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contentWrapper">
                <div className="addressSection">
                    <h3 className="sectionTitle">South Florida</h3>
                    <p>Boca Raton</p>
                    <p>+1 908 460 5930</p>
                </div>

                <div className="linksSection">
                    <div className="linkGroup">
                        <h3 className="sectionTitle">Let's get in touch</h3>
                        <a href="mailto:zenflo.studios@gmail.com">zenflo.studios@gmail.com</a>
                    </div>


                </div>
                <div className="right-column">

                    <div className="socialSection">
                        <h3 className="sectionTitle">Social</h3>
                        <div className="socialLinks">
                            <a href="https://twitter.com/wearecollins" target="_blank" rel="noopener noreferrer">X: @zenflostudios</a>
                            <a href="https://instagram.com/zenflo" target="_blank" rel="noopener noreferrer">Instagram: @zenflostudios</a>
                            {/* <a href="https://linkedin.com/company/collins" target="_blank" rel="noopener noreferrer">LinkedIn: COLLINS</a> */}
                        </div>
                    </div>
                

                <div className="copyright">
                    <p>Zenflo Studios {new Date().getFullYear()}</p>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;