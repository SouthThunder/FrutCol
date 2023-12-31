import React, { useEffect } from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export const Footercom = ({ product }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--container-color",
      product.header_color
    );
    document.documentElement.style.setProperty(
      "--btn-color",
      product.main_color
    );
  }, [product]);

  return (
    <footer
      style={{
        backgroundColor: product.header_color,
        transition: "all 1s var(--btn-cubic-bezier)",
      }}
    >
      <div className="footer__section">
        <Link to="/" className="footer__logo">
        <picture>
          <source srcSet={"images/Frame 1.avif"} type="image/avif" />
          <source srcSet={"images/Frame 1.webp"} type="image/webp" />
          <img src="images/Frame 1.png" alt="" />
        </picture>
        </Link>

        <div className="footer__content">
          <h3 className="footer__title">Contáctanos</h3>
          <ul className="footer__links">
            <li>
              <Link to="#" className="footer__link">
                <i className="ri-phone-line"> 317 4358995</i>
              </Link>
            </li>
            <li>
              <a
                href="mailto:frutcol0518@gmail.com"
                className="footer__link"
                target="_balnk"
              >
                <i className="ri-mail-line"> frutcol0518@gmail.com</i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Redes Sociales</h3>
          <div className="footer__social">
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              className="footer__social-link"
            >
              <i className="ri-facebook-fill"></i>
            </Link>
            <Link
              to="https://wa.me/573174358995"
              target="_blank"
              className="footer__social-link"
            >
              <i className="ri-whatsapp-line"></i>
            </Link>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="footer__social-link"
            >
              <i className="ri-instagram-line"></i>
            </Link>
          </div>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">¿Quiénes Somos?</h3>
          <ul className="footer__links">
            <li>
              <Link to="/QuienesSomos" className="footer__link">
                Nuestra Historia
              </Link>
            </li>
            <li>
              <Link to="/Privacidad" className="footer__link">
                Políticas de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
