import React, { useState } from "react";
import "./footer.css";
import { Link } from 'react-router-dom';

export const Footercom = () => {
  return (
    <footer >
        <div className="footer__section">
        <Link to="#" className="footer__logo"> 
        <img src="images/Frame 1.png" alt="" />
        </Link>   
        
        <div className="footer__content">
            <h3 className="footer__title">Contáctanos</h3>
            <ul className="footer__links">
                <li>
                    <Link to="#" className="footer__link">
                    <i class="ri-phone-line"></i> 571 3108621696</Link>
                </li>
                <li>
                    <Link to="#" className="footer__link"><i class="ri-mail-line"></i> frutcol0518@gmail.com</Link>
                </li>
            </ul>
        </div>
        <div className="footer__content">
            <h3 className="footer__title">Redes Sociales</h3>
            <div className="footer__social">
            <Link to="https://www.facebook.com/" target="_blank"  className="footer__social-link">
                        <i class="ri-facebook-fill"></i>
                    </Link>
                    <Link to="https://twitter.com/" target="_blank" className="footer__social-link">
                        <i class="ri-twitter-x-line"></i>
                    </Link>
                    <Link to="https://www.instagram.com/" target="_blank" className="footer__social-link">
                        <i class="ri-instagram-line"></i>
                    </Link>
            </div>
        </div>
        <div className="footer__content">
            <h3 className="footer__title">¿Quiénes Somos?</h3>
            <ul className="footer__links">
                <li>
                    <Link to="#" className="footer__link">Nuestra Historia</Link>
                </li>
                <li>
                    <Link to="#" className="footer__link">FAQ</Link>
                </li>
            </ul>
        </div>
        </div>
    </footer>
  );
};
