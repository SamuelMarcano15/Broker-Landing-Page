import '../assets/styles/contact.css'
import instagramImg from '../assets/images/icons/instagram.webp'
import facebookImg from '../assets/images/icons/facebook.webp'
import telegramImg from '../assets/images/icons/telegram.png'
import EmailIcon from '../components/icons/EmailIcon'
import PhoneIcon from '../components/icons/PhoneIcon'
import NavBarLanding from '../components/NavBarLanding'
import FooterLanding from '../components/FooterLanding'
const Contact = () =>{
    return(
        <div className="main">
            <NavBarLanding/>
            <div className='section-contact'>
                <div className="container m-auto">
                    <div className="d-flex flex-column justify-content-center align-items-center card m-auto" style={{backgroundColor:'#272b35', maxWidth:'780px'}}>
                        <h1 className="text-white title-contact text-center mb-2">Contactanos</h1>
                        <p className='text-white mt-2 text-center'>Si tienes algun problema, duda o alguna inquietud, puedes escribirnos a traves de los siguientes medios</p>
                        <div className='d-flex flex-column gap-2 mt-4'>
                            <a href="mailto:" target='_blank' rel='noopener noreferrer' className='d-flex flex-wrap gap-2'><EmailIcon/>Correo electronico: </a>
                            <a href="tel:" target='_blank' rel='noopener noreferrer' className='d-flex flex-wrap gap-2'><PhoneIcon/>Numero telefonico: </a>
                        </div>
                        <h2 className='subtitle-contact mt-4 text-center'>Encuentranos en nuestra redes sociales</h2>
                        <div className='d-flex flex-wrap justify-content-center align-items-center gap-4 mt-3'>
                            <a href="#" target='_blank' rel='noopener noreferrer'><img src={instagramImg} style={{width:'48px', height:'48px'}} alt="instagram"/></a>
                            <a href="#" target='_blank' rel='noopener noreferrer'><img src={facebookImg} style={{width:'48px', height:'48px'}} alt="facebook"/></a>
                            <a href="#" target='_blank' rel='noopener noreferrer'><img src={telegramImg} style={{width:'48px', height:'48px'}} alt="telegram"/></a>
                        </div>
                    </div>
                </div>
            </div>
            <FooterLanding/>
        </div>
    )
}

export default Contact