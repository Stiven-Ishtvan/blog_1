import React from 'react';
import './index.css';
import telegram from './img/telegram.svg';
import viber from './img/viber.svg';
import whatsapp from './img/whatsapp.svg';
import vk from './img/vk.svg';
import Logo from '../Logo';

export const Footer = () => {
  return (
      <footer>
          <div>
          <Logo/>
              <p>&copy;2022 Блог ололо</p>
          </div>
          <nav>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
          </nav>
          <ul>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
              
          </ul>
          
          <div>
              <h4>Наши контакты:</h4>
              <p>Наш телефон: 223-223-322</p>
              <p>Наш mail: nasharedakciya@doma.ru</p>
              <ul className="soc">
                    <li><a href=""><img src={telegram} alt='telegram' className='socials__icon' /></a></li>
                    <li><a href=""><img src={whatsapp} alt='whatsapp' className='socials__icon' /></a></li>
                    <li><a href=""><img src={viber} alt='viber' className='socials__icon' /></a></li>
                    <li><a href=""><img src={vk} alt='vk' className='socials__icon' /></a></li>
                    
                </ul>
              
          </div>
      </footer>
  )
}
export default Footer;