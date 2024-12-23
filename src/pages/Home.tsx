import {useState} from 'react'
import { Link } from "react-router-dom"
import { useRef, useEffect } from 'react';
import '../assets/styles/home.css'
import ScreenIcon from '../components/icons/ScreenIcon'
import ArrowRightIcon from '../components/icons/ArrowRightIcon'
import forexImage from '../assets/images/forex.png'
import criptoImage from '../assets/images/crypto.png'
import phoneImage from "../assets/images/phone.webp"
import NavBarLanding from '../components/NavBarLanding'
import FooterLanding from '../components/FooterLanding'
import VideoPlayer from '../components/VideoPlayer'
import InterfacePlataformDemo from '../components/VideoInterfaceDemo'
import Actions from '../assets/images/actions.webp'
import PhoneDefault from '../assets/images/phone-default_new.webp'
import MobileMdNew from '../assets/images/mobile-md_new.webp'
import DesktopMdNew from '../assets/images/desktop_new.webp'
import Onetech from '../assets/images/onetech.webp'



const Home = () =>{
    const [features,setFeatures] = useState([
        {

        }
    ])
    return(
        <>
        <div className="main">
            <section className="hero-section animate-section">
            <NavBarLanding/>
              <div className='main-heroSection'>
                 <div className='video-heroSection'>
                    <VideoPlayer/>   
                 </div>
              </div>
              <div className='information-header mt-5'>
                <div className='information-header__container mt-5'>
                    <div className='title-header text-white d-flex justify-content-center align-items-center'>
                        Plataforma innovadora  para <br />inversiones inteligentes 
                    </div>
                    <div className='subtitle-header d-flex justify-content-center align-items-center'>
                        Registrese y obtenga 10,000 USD  en su cuenta para aprender a operar.
                    </div>
                    <div className='header-btns d-flex justify-content-center align-items-center'>
                        <Link className='btn-register text-white ' to={"#"}>Cree una cuenta gratuita</Link>
                        <div className='header-msg_help text-white'>
                            El monto minimo de deposito para comenzar <br />a operar en tiempo real es de 10 USD
                        </div>
                    </div>
                </div>
              </div>
              <div className='interface-plataform-container d-flex justify-content-center'>
                <InterfacePlataformDemo/> 
              </div>
            </section>
            <section className='Seo-Numbers'>
                <div className="cards d-flex">

                    <div className='col col-left d-flex flex-column'>
                        <svg  className='svg-card' width="30" height="30" viewBox="0 0 18 18" fill="#0094ff" xmlns="http://www.w3.org/2000/svg ">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36666 8.20622C2.66248 5.57837 4.49411 3.41541 6.94277 2.63608C6.0345 4.6496 5.51928 6.42527 5.42018 8.20622H2.36666ZM6.92284 8.20622C7.03549 6.44654 7.61926 4.61824 8.74705 2.32818C8.81644 2.32603 8.88611 2.32495 8.95603 2.32495C8.98541 2.32495 9.01475 2.32514 9.04405 2.32552C10.1727 4.61682 10.7569 6.44586 10.8696 8.20622H6.92284ZM10.8525 9.70622H6.93991C7.08884 11.4396 7.68449 13.276 8.75925 15.5847C8.82461 15.5866 8.89021 15.5876 8.95603 15.5876C8.98139 15.5876 9.00672 15.5875 9.03201 15.5872C10.1075 13.2773 10.7035 11.4402 10.8525 9.70622ZM10.7933 15.3298C11.6865 13.2752 12.2242 11.4792 12.3573 9.70622H15.5454C15.2426 12.3967 13.3299 14.5999 10.7933 15.3298ZM12.3722 8.20622C12.2724 6.41274 11.7506 4.62462 10.8304 2.59356C13.3485 3.33417 15.244 5.52892 15.5454 8.20622H12.3722ZM2.36664 9.70622H5.43511C5.56728 11.4674 6.09869 13.2512 6.98125 15.2886C4.51327 14.5197 2.66398 12.3479 2.36664 9.70622ZM8.95603 0.824951C4.46523 0.824951 0.824707 4.46547 0.824707 8.95628C0.824707 13.4471 4.46523 17.0876 8.95603 17.0876C13.4468 17.0876 17.0874 13.4471 17.0874 8.95628C17.0874 4.46547 13.4468 0.824951 8.95603 0.824951Z"></path>
                        </svg>
                        <span className='title-card text-white fs-1 '>130+ <br />países</span>
                        <p className='information text-white'>Soportamos 13 idiomas, así que inversores de todo el mundo pueden disfrutar y ganar en cualquier momento</p>
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col card-right d-flex flex-column'> 
                                <svg  className="svg-card_right" width="30" height="30" viewBox="0 0 24 24" fill="#0094ff" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 3C9.23851 3 6.99994 5.23858 6.99994 8C6.99994 9.4206 7.59239 10.7028 8.54369 11.6131C6.64938 12.3524 5.36998 13.6585 4.53377 14.9592C3.90954 15.9303 3.53215 16.8938 3.31028 17.6106C3.19883 17.9707 3.12518 18.2732 3.07878 18.4897C3.05556 18.5981 3.03908 18.6853 3.02805 18.7479C3.02254 18.7792 3.01839 18.8043 3.01543 18.8229L3.01187 18.8458L3.01073 18.8535L3.01031 18.8564L3.00999 18.8586C2.93189 19.4053 3.31179 19.9118 3.85852 19.99C4.4044 20.0679 4.91019 19.6894 4.98952 19.144L4.99062 19.1369C4.99188 19.129 4.99419 19.1149 4.99771 19.0949C5.00476 19.0549 5.0166 18.9918 5.03439 18.9087C5.07002 18.7425 5.12919 18.4981 5.22086 18.2019C5.40523 17.6062 5.71535 16.8197 6.21612 16.0408C7.19743 14.5143 8.90859 13 11.9999 13C15.0913 13 16.8025 14.5143 17.7838 16.0408C18.2845 16.8197 18.5947 17.6062 18.779 18.2019C18.8707 18.4981 18.9299 18.7425 18.9655 18.9087C18.9833 18.9918 18.9951 19.0549 19.0022 19.0949C19.0048 19.1098 19.0068 19.1215 19.0081 19.1298C19.0086 19.1325 19.0089 19.1349 19.0093 19.1369L19.0101 19.1423L19.0104 19.144C19.0897 19.6894 19.5955 20.0679 20.1414 19.99C20.6881 19.9118 21.068 19.4053 20.9899 18.8586L20.9896 18.8564L20.9892 18.8535L20.988 18.8458L20.9845 18.8229C20.9815 18.8043 20.9773 18.7792 20.9718 18.7479C20.9608 18.6853 20.9443 18.5981 20.9211 18.4897C20.8747 18.2732 20.8011 17.9707 20.6896 17.6106C20.4677 16.8938 20.0903 15.9303 19.4661 14.9592C18.6299 13.6585 17.3505 12.3524 15.4562 11.6131C16.4075 10.7028 16.9999 9.4206 16.9999 8C16.9999 5.23858 14.7614 3 11.9999 3ZM8.99994 8C8.99994 6.34315 10.3431 5 11.9999 5C13.6568 5 14.9999 6.34315 14.9999 8C14.9999 9.65685 13.6568 11 11.9999 11C10.3431 11 8.99994 9.65685 8.99994 8Z" fill="#0094FF"/>
                                </svg>
                                <span className='title-card_right text-white fs-1'>88MM+</span>
                                <p className='information-right text-white'>Cuentas de inversores</p>
                            </div>
                            <div className='col card-right d-flex flex-column'> 
                                <svg className="svg-card_right" width="30" height="30" viewBox="0 0 24 24" fill="#0094ff" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70707 12.05C8.31655 11.6595 7.68338 11.6595 7.29286 12.05L3.05022 16.2926C2.65969 16.6831 2.65969 17.3163 3.05022 17.7068L7.29286 21.9495C7.68338 22.34 8.31655 22.34 8.70707 21.9495C9.0976 21.5589 9.0976 20.9258 8.70707 20.5353L6.17154 17.9997L13 17.9997C13.5523 17.9997 14 17.552 14 16.9997C14 16.4474 13.5523 15.9997 13 15.9997L6.17154 15.9997L8.70707 13.4642C9.0976 13.0737 9.0976 12.4405 8.70707 12.05Z" fill="#0094FF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2929 2.0501C15.6835 1.65957 16.3166 1.65957 16.7071 2.0501L20.9498 6.29274C21.3403 6.68326 21.3403 7.31642 20.9498 7.70695L16.7071 11.9496C16.3166 12.3401 15.6835 12.3401 15.2929 11.9496C14.9024 11.5591 14.9024 10.9259 15.2929 10.5354L17.8285 7.99984L11 7.99984C10.4477 7.99984 10 7.55213 10 6.99984C10 6.44756 10.4477 5.99984 11 5.99984L17.8285 5.99984L15.2929 3.46431C14.9024 3.07378 14.9024 2.44062 15.2929 2.0501Z" fill="#0094FF"/>
                                </svg>
                                <span className='title-card_right text-white fs-1'>30MM+</span>
                                <p className='information-right text-white'>Transacciones mensuales</p>
                            </div>
                        </div>
                        <div className='row'>
                        <div className='col card-right d-flex flex-column'> 
                                <svg className="svg-card_right" width="30" height="30" viewBox="0 0 24 24" fill="#0094ff" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17 4.77507C17 4.09251 16.3313 3.61054 15.6838 3.82638L9.16228 6.00022H17V4.77507ZM19 6.00022V4.77507C19 2.7274 16.9939 1.28148 15.0513 1.92902L4.05132 5.59568C2.82629 6.00403 2 7.15044 2 8.44173V17.0002C2 18.6571 3.34315 20.0002 5 20.0002H5.5C6.05228 20.0002 6.5 19.5525 6.5 19.0002C6.5 18.4479 6.05228 18.0002 5.5 18.0002H5C4.44772 18.0002 4 17.5525 4 17.0002V9.00022C4 8.44793 4.44772 8.00022 5 8.00022H19C19.5523 8.00022 20 8.44793 20 9.00022V17.0002C20 17.5525 19.5523 18.0002 19 18.0002H18.5C17.9477 18.0002 17.5 18.4479 17.5 19.0002C17.5 19.5525 17.9477 20.0002 18.5 20.0002H19C20.6569 20.0002 22 18.6571 22 17.0002V9.00022C22 7.34336 20.6569 6.00022 19 6.00022ZM12 11.0002C12.5523 11.0002 13 11.4479 13 12.0002V18.5989L14.2956 17.3131C14.6876 16.9241 15.3208 16.9265 15.7098 17.3185C16.0988 17.7105 16.0964 18.3437 15.7044 18.7327L12.7044 21.71C12.3145 22.097 11.6855 22.097 11.2956 21.71L8.29558 18.7327C7.90358 18.3437 7.90117 17.7105 8.29021 17.3185C8.67925 16.9265 9.31241 16.9241 9.70442 17.3131L11 18.5989V12.0002C11 11.4479 11.4477 11.0002 12 11.0002Z" fill="#0094FF"/>
                                </svg>
                                <span className='title-card_right text-white fs-1'>USD 16MM+</span>
                                <p className='information-right text-white'>Promedio mensual de pagos</p>
                            </div>
                            <div className='col card-right d-flex flex-column'> 
                                <svg className="svg-card_right" width="30" height="30" viewBox="0 0 24 24" fill="#0094ff" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.2074 20 16.2045 19.1073 17.653 17.6607C18.0438 17.2705 18.6769 17.2709 19.0672 17.6617C19.4574 18.0525 19.457 18.6857 19.0662 19.0759C17.258 20.8816 14.7587 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.091 2 19.6068 4.47828 21.1584 7.99984L21.8082 6.48881C22.0263 5.98144 22.6145 5.747 23.1219 5.96517C23.6292 6.18333 23.8637 6.77149 23.6455 7.27886L21.8679 11.4129C21.6497 11.9202 21.0616 12.1547 20.5542 11.9365L16.4202 10.1589C15.9128 9.94074 15.6784 9.35258 15.8965 8.84521C16.1147 8.33785 16.7029 8.1034 17.2102 8.32157L19.5341 9.32081C18.4205 6.22768 15.4617 4 12 4Z" fill="#0094FF"/>
                                </svg>
                                <span className='title-card_right text-white fs-1'>USD 211MM</span>
                                <p className='information-right text-white'>Volumen de operaciones mensual</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='Trading-modes d-flex justify-content-between'>
                <div className='trading-modes__information'>
                    <span className='trading-modes__title'>Modos de trading que se <br />adaptan a tu estilo</span>
                    <div className='cards_trading-modes d-flex'>
                        <div className='trading-Mode'>
                            <div className='container_img d-flex justify-content-between'>
                                <img className='img_trading-mode' src={Actions}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="40" height="40">
                                <path fill="#fff" fill-rule="evenodd" d="M12.39 9.724c.521-.52 1.365-.52 1.886 0l5.334 5.333c.52.52.52 1.365 0 1.886l-5.334 5.333a1.333 1.333 0 1 1-1.886-1.886L16.782 16l-4.39-4.39a1.333 1.333 0 0 1 0-1.886z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span className='card-title_trading-mode text-white fw-bold'>ACCIONES</span>
                            <p className='card-information_trading-mode'>Gana con la <br /> compra y venta de <br /> activos</p>
                        </div>
                        <div className='trading-Mode'>
                            <div className='container_img d-flex justify-content-between'>
                                <img className='img_trading-mode' src={Actions}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="40" height="40">
                                <path fill="#fff" fill-rule="evenodd" d="M12.39 9.724c.521-.52 1.365-.52 1.886 0l5.334 5.333c.52.52.52 1.365 0 1.886l-5.334 5.333a1.333 1.333 0 1 1-1.886-1.886L16.782 16l-4.39-4.39a1.333 1.333 0 0 1 0-1.886z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span className='card-title_trading-mode text-white fw-bold'>ACCIONES</span>
                            <p className='card-information_trading-mode'>Gana con la <br /> compra y venta de <br /> activos</p>
                        </div>
                        <div className='trading-Mode'>
                            <div className='container_img d-flex justify-content-between'>
                                <img className='img_trading-mode' src={Actions}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="40" height="40">
                                <path fill="#fff" fill-rule="evenodd" d="M12.39 9.724c.521-.52 1.365-.52 1.886 0l5.334 5.333c.52.52.52 1.365 0 1.886l-5.334 5.333a1.333 1.333 0 1 1-1.886-1.886L16.782 16l-4.39-4.39a1.333 1.333 0 0 1 0-1.886z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <span className='card-title_trading-mode text-white fw-bold'>ACCIONES</span>
                            <p className='card-information_trading-mode'>Gana con la <br /> compra y venta de <br /> activos</p>
                        </div>
                    </div>
                </div>
                <div className='Trading-modes__img'>
                    <div className='img-phone1'>
                        <img src={PhoneDefault}/>
                    </div>
                </div>
            </section>
            <section className='Seo-device'>
                <span className='Seo-device_title'>Opere en su dispositivo</span>
                <p className='Seo-device_information'>Pruebe la última versión de nuestra aplicación de <br /> trading para disfrutar de una experiencia de trading <br />fluida y sin distracciones</p>
                <div className='Cards_Seo-device d-flex'>
                    <div className='Card_seo-device' style={{marginRight:"50px"}}>
                        <span className='title-device'>Móvil</span> 
                        <div className='plataforms-download'>
                            <div className='container mt-0'>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='plataform1'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play</span>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='plataform2'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play</span>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='plataform3'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row' style={{marginTop:"20px"}}>
                                    <div className='col'>
                                        <div className='plataform4'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='information-plataforms d-flex'>
                            <div className='information-plataforms_data'>
                                <span className='information-plataforms_title'>44M+</span>
                                <p className='information-plataforms_description'>Descarga De Aplicación</p>

                                <span className='information-plataforms_title2'>4.2 </span>
                                <p className='information-plataforms_description'>Calificación De Aplicación</p>
                            </div>
                            <div className='information-plataform_img'>
                                <img className='image-phone' src={MobileMdNew}/>
                            </div>
                            
                        </div>
                    </div>
                    <div className='Card_seo-device'>
                        <span className='title-device'>Móvil</span> 
                        <div className='plataforms-download'>
                            <div className='container mt-0'>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='plataform1'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play</span>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='plataform2'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play</span>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='plataform3'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row' style={{marginTop:"20px"}}>
                                    <div className='col'>
                                        <div className='plataform4'>
                                            <svg className="googleplay" viewBox="0 0 24 24" width="30" height="30" role="presentation" focusable="false" aria-hidden="true">
                                                <path fill="#83A4C1" d="M3.075 1.359a2.793 2.793 0 012.727-.007l10.664 5.886-3.367 3.367L3.075 1.36zM1.688 3.648c0-.485.14-.943.385-1.343l10.053 9.274-10.08 10.08a2.572 2.572 0 01-.358-1.311v-16.7zM20.93 9.702l-3.212-1.773-3.609 3.608 4.423 4.08 2.4-1.324c.863-.479 1.38-1.337 1.38-2.296-.002-.96-.517-1.818-1.382-2.295zM3.03 22.618L13.137 12.51l4.128 3.807-11.463 6.326c-.43.238-.9.356-1.368.356-.484 0-.965-.132-1.404-.382z"></path>
                                            </svg>
                                            <span className='title-plataform'>Google Play </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='information-plataforms d-flex'>
                            <div className='information-plataforms_data'>
                                <span className='information-plataforms_title'>44M+</span>
                                <p className='information-plataforms_description'>Descarga De Aplicación</p>

                                <span className='information-plataforms_title2'>4.2 </span>
                                <p className='information-plataforms_description'>Calificación De Aplicación</p>
                            </div>
                            <div className='information-plataform_img'>
                                <img className='image-phone' src={MobileMdNew}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            
            </section>
             <section className='informationForyou'>
                <span className='informationForyou_title'>Suba su nivel en el trading <br />con el Blog Oficial</span>
                <p className='informationForyou_information'>Todo lo que necesita para convertirse en un gurú del trading en un solo <br /> lugar: educación, análisis, lecciones en video,<br />consejos de trading, noticias del mercado, ¡y mucho más!</p>
                <div className='informationForyou-cards'>
                    <div className='container-informationForyou'>
                        <div className='row' style={{width:"1400px"}}>
                            <div className='col' >
                                <div className='card-informationForYou'>
                                    <span className='title-informationForYou'>Diez sencillas técnicas de trading <br /> con "Broker"</span>
                                    <img src={Onetech} className='img-informationForYou' />
                                </div>
                            </div>
                            <div className='col'>
                                <div className='card-informationForYou'>
                                    <span className='title-informationForYou'>Diez sencillas técnicas de trading <br /> con "Broker"</span>
                                    <img src={Onetech} className='img-informationForYou' />
                                </div>
                            </div>
                        </div>
                        <div className='row' style={{width:"1400px"}}>
                            <div className='col'>
                                <div className='card-informationForYou'>
                                    <span className='title-informationForYou'>Diez sencillas técnicas de trading <br /> con "Broker"</span>
                                    <img src={Onetech} className='img-informationForYou' />
                                </div>
                            </div>
                            <div className='col'>
                                <div className='card-informationForYou'>
                                    <span className='title-informationForYou'>Diez sencillas técnicas de trading <br /> con "Broker"</span>
                                    <img src={Onetech} className='img-informationForYou' />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </section>
            <section className='Plataform-functions d-flex justify-content-between'>
            <div className='Plataform-function_introduction'>   
                <span className='Plataform-functions_title'>Una Plataforma que <br />Trabaja para Usted</span>
                <p className='Plataform-functions_information'>Estas funciones le ayudarán a alcanzar sus <br />objetivos.</p>
                <div className='btn-comenzar_container'>
                <button  className='btn-comenzar'>Comience a Operar - <br /> <p style={{color:"#ffffff7c"}}>Es Gratis</p></button>
                </div>
            </div>
            <div className='plataform-function-cards'>
                <div className='row'>
                    <div className='col'>
                        <div className='card-plataform-function'>
                            <div>
                                <svg className='svg-plataform-function' width="40" height="40" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
                                <path fill="#0094ff" fill-rule="evenodd" d="M11.45 2.117a2 2 0 011.1 0l6 1.714A2 2 0 0120 5.754V12.5c0 2.98-1.52 5.175-3.14 6.658-1.615 1.477-3.4 2.319-4.142 2.632a1.84 1.84 0 01-1.436 0c-.743-.313-2.527-1.155-4.141-2.632C5.519 17.675 4 15.48 4 12.5V5.754a2 2 0 011.45-1.923l6-1.714zM12 4.04L6 5.754l-.275-.961.275.961V12.5c0 2.233 1.123 3.931 2.49 5.183 1.335 1.22 2.835 1.95 3.51 2.24.675-.29 2.175-1.02 3.51-2.24C16.876 16.43 18 14.733 18 12.5V5.754L12 4.04z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        <span className='title-card-plataform-function'> Operaciones <br />sin riesgo</span>
                        </div> 
                        </div>
                    <div className='col'>
                        <div className='card-plataform-function'>
                            <div>
                                <svg className='svg-plataform-function' width="40" height="40" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
                                <path fill="#0094ff" fill-rule="evenodd" d="M11.45 2.117a2 2 0 011.1 0l6 1.714A2 2 0 0120 5.754V12.5c0 2.98-1.52 5.175-3.14 6.658-1.615 1.477-3.4 2.319-4.142 2.632a1.84 1.84 0 01-1.436 0c-.743-.313-2.527-1.155-4.141-2.632C5.519 17.675 4 15.48 4 12.5V5.754a2 2 0 011.45-1.923l6-1.714zM12 4.04L6 5.754l-.275-.961.275.961V12.5c0 2.233 1.123 3.931 2.49 5.183 1.335 1.22 2.835 1.95 3.51 2.24.675-.29 2.175-1.02 3.51-2.24C16.876 16.43 18 14.733 18 12.5V5.754L12 4.04z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        <span className='title-card-plataform-function'> Operaciones <br />sin riesgo</span>
                        </div>
                        </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='card-plataform-function'>
                            <div>
                                <svg className='svg-plataform-function' width="40" height="40" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
                                <path fill="#0094ff" fill-rule="evenodd" d="M11.45 2.117a2 2 0 011.1 0l6 1.714A2 2 0 0120 5.754V12.5c0 2.98-1.52 5.175-3.14 6.658-1.615 1.477-3.4 2.319-4.142 2.632a1.84 1.84 0 01-1.436 0c-.743-.313-2.527-1.155-4.141-2.632C5.519 17.675 4 15.48 4 12.5V5.754a2 2 0 011.45-1.923l6-1.714zM12 4.04L6 5.754l-.275-.961.275.961V12.5c0 2.233 1.123 3.931 2.49 5.183 1.335 1.22 2.835 1.95 3.51 2.24.675-.29 2.175-1.02 3.51-2.24C16.876 16.43 18 14.733 18 12.5V5.754L12 4.04z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        <span className='title-card-plataform-function'> Operaciones <br />sin riesgo</span>
                        </div>
                        </div>
                    <div className='col'>
                        <div className='card-plataform-function'>
                            <div>
                                <svg className='svg-plataform-function' width="40" height="40" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
                                <path fill="#0094ff" fill-rule="evenodd" d="M11.45 2.117a2 2 0 011.1 0l6 1.714A2 2 0 0120 5.754V12.5c0 2.98-1.52 5.175-3.14 6.658-1.615 1.477-3.4 2.319-4.142 2.632a1.84 1.84 0 01-1.436 0c-.743-.313-2.527-1.155-4.141-2.632C5.519 17.675 4 15.48 4 12.5V5.754a2 2 0 011.45-1.923l6-1.714zM12 4.04L6 5.754l-.275-.961.275.961V12.5c0 2.233 1.123 3.931 2.49 5.183 1.335 1.22 2.835 1.95 3.51 2.24.675-.29 2.175-1.02 3.51-2.24C16.876 16.43 18 14.733 18 12.5V5.754L12 4.04z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        <span className='title-card-plataform-function'> Operaciones <br />sin riesgo</span>
                        </div>
                    </div>
                </div>
                    
                    
            </div>
            
            
            
            
            </section>

            <FooterLanding/>
        </div>
        </>
    )
}

export default Home



