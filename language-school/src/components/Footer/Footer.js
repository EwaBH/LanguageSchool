import React from 'react'
import "./Footer.scss";



const Footer = () => {
  return (
    <div className="footer__container">
      <span className="footer__text">kontakt:</span>
      <a href="mailto:info@ls.xyz" className="footer__item">
        <span className="material-symbols-outlined footer__icon" alt="mail">
          mail
        </span>
        info@ls.xyz
      </a>
      <a href="tel:602 510 614" className="footer__item">
        <span className="material-symbols-outlined footer__icon" alt="phone">
          call
        </span>
        602 510 614
      </a>
    </div>
  );
}

 export default Footer