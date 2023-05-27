import React from "react";

import './footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <span>
            <a href="https://github.com/cstandre">
                <i className="fa-brands fa-github fa-2x footer-icon"></i>
            </a>
            </span>
            <span>
                <a href="https://www.linkedin.com/in/caitlyn-st-andre-46b1ba143/">
                    <i className="fa-brands fa-linkedin fa-2x footer-icon"></i>
                </a>
            </span>
        </div>
    )
};

export default Footer;
