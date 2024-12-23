import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/components/NavBarLanding.css'

const NavBarLanding = () => {
    const navbarRef = useRef<HTMLDivElement>(null); // Especifica el tipo HTMLDivElement
    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 6000)
      if (navbarRef.current instanceof HTMLDivElement) {
        navbarRef.current.classList.toggle('changed-color', isScrolled); 
      }
    };
    

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll',   
 handleScroll);
  }, []);

  return (
    <nav id="navBar" ref={navbarRef} className={`navBar ${isScrolled ? 'scrolled' : ''}` }>
                <div className="logo-broker text-white fs-3">
                    Broker
                    {/*<img className="img__logoBroker" src="" alt="" />*/}
                </div>
                <div className="navbar_items d-flex">
                    <div className="nav_links">
                        <ul className="d-flex fw-bold">
                            <li><Link className="nav-link" to="#">Cuenta Demo</Link></li>
                            <li><Link className="nav-link" to="#">Acerca de nosotros</Link></li>
                            <li><Link className="nav-link" to="#">FAQ</Link></li>
                            <li><Link className="nav-link" to="#">Blog</Link></li>
                        </ul>
                    </div>
                    <div className="nav_options d-flex">
                        <div className="btns_login-register">
                            <Link className="text-white text-nowrap fw-bold btn btn-login" to="/app/login">Iniciar Sesión</Link>
                            <Link className="text-white text-nowrap fw-bold btn btn-register" to="/app/login">Registrarse</Link>
                        </div>
                        <div className="dropdown">
                            <div className="btn_ChangeLanguage text-white fw-bold dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg  width="20" height="20" viewBox="0 0 18 18" fill="#FFF" xmlns="http://www.w3.org/2000/svg ">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36666 8.20622C2.66248 5.57837 4.49411 3.41541 6.94277 2.63608C6.0345 4.6496 5.51928 6.42527 5.42018 8.20622H2.36666ZM6.92284 8.20622C7.03549 6.44654 7.61926 4.61824 8.74705 2.32818C8.81644 2.32603 8.88611 2.32495 8.95603 2.32495C8.98541 2.32495 9.01475 2.32514 9.04405 2.32552C10.1727 4.61682 10.7569 6.44586 10.8696 8.20622H6.92284ZM10.8525 9.70622H6.93991C7.08884 11.4396 7.68449 13.276 8.75925 15.5847C8.82461 15.5866 8.89021 15.5876 8.95603 15.5876C8.98139 15.5876 9.00672 15.5875 9.03201 15.5872C10.1075 13.2773 10.7035 11.4402 10.8525 9.70622ZM10.7933 15.3298C11.6865 13.2752 12.2242 11.4792 12.3573 9.70622H15.5454C15.2426 12.3967 13.3299 14.5999 10.7933 15.3298ZM12.3722 8.20622C12.2724 6.41274 11.7506 4.62462 10.8304 2.59356C13.3485 3.33417 15.244 5.52892 15.5454 8.20622H12.3722ZM2.36664 9.70622H5.43511C5.56728 11.4674 6.09869 13.2512 6.98125 15.2886C4.51327 14.5197 2.66398 12.3479 2.36664 9.70622ZM8.95603 0.824951C4.46523 0.824951 0.824707 4.46547 0.824707 8.95628C0.824707 13.4471 4.46523 17.0876 8.95603 17.0876C13.4468 17.0876 17.0874 13.4471 17.0874 8.95628C17.0874 4.46547 13.4468 0.824951 8.95603 0.824951Z"></path>
                            </svg>
                            ES
                            </div>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">العربية</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">বাংলা</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">English</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Español</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">فارسی</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Filipino</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Français</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">हिन्दी</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">日本語</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">한국어</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Malay</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Português</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Русский</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">ไทย</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Türkçe</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Українська</Link>
                                        </div>
                                </li>
                                </div>
                                <div className="container text-left">
                                <li className="row">
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">Українська</Link>
                                        </div>
                                        <div className="col">
                                            <Link className="dropdown-item" to="#">中文</Link>
                                        </div>
                                </li>
                                </div>
                                
                            </ul>
                        </div>
                    </div>
                </div>
        </nav>
    )
};

export default NavBarLanding