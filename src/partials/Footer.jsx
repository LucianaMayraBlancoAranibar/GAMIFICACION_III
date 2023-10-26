import React, { useState } from 'react';

import SearchModal from '../components/ModalSearch';
import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
import UserMenu from '../components/DropdownProfile';
import ThemeToggle from '../components/ThemeToggle';
import '../css/footer.css'

function Footer({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <footer className="footer-distributed">

        <div className="footer-left">
            <h3>Gamificación</h3>

            <br/>
            <br/>
            <br/>

            <p className="footer-company-name">Copyright © 2023 <strong>Gamificacion</strong> Todos los derechos reservados </p>
        </div>

        <div className="footer-center">
            <div>
                <i className="fa fa-map-marker"></i>
                <p>Contactos</p>
            </div>

            <div>
                <i className="fa fa-phone"></i>
                <p>Telf: +591 74**9**258</p>
            </div>
            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:sagar00001.co@gmail.com">Gmail: xyz@gmail.com</a></p>
            </div>
        </div>
        <div className="footer-right">
            <p className="footer-company-about">
                <span>Acerca de Gamificación</span>
                El <strong>Ranking Estudiantil</strong> es una manera de ayudar a nuestos estudiantes de manera
                en que los proyectos o trabajos que realizen se conviertan en badges para su portafolio
            </p>
            <div className="footer-icons">
                <a href="#"><i className="iconimage"><img src='/src/images/iconsFooter/facebook_logo_icon_147291.png'></img></i></a>
                <a href="#"><i className="iconimage"><img src='/src/images/iconsFooter/instagram (2).png'></img></i></a>
                <a href="#"><i className="iconimage"><img src='/src/images/iconsFooter/twitter.png'></img></i></a>
                <a href="#"><i className="iconimage"><img src='/src/images/iconsFooter/youtube.png'></img></i></a>
            </div>
        </div>
    </footer>

  );
};

export default Footer;
