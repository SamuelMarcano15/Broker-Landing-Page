import { Link } from 'react-router-dom'
import '../assets/styles/footer.css'
const FooterLanding = () =>{
    return(
        <footer className="footer" role="contentinfo"  >
    <div className="footer-left h-card">
        <h3 className="p-name">Broker</h3>

        <nav aria-label="Footer Navigation">
            <p className="footer-links d-flex justify-content-center justify-content-lg-start gap-3">
                <Link to="/" className="link-1">Inicio</Link>
                <Link to="/#about">Sobre nosotros</Link>
                <Link to="/app/login">Iniciar sesion</Link>
                <Link to="/contact">Contactanos</Link>
            </p>
        </nav>

        <p className="footer-company-name">Broker © 2024</p>
    </div>

    <div className="footer-center">
        <div  className="p-address">
            <p>
                <span  className="p-street-address">Direction: 123 This is a Street</span>
            </p>
        </div>

        <div>
            <p  className="p-tel">Phone number: +1 234567890</p>
        </div>

        <div>
            <p><a href="mailto:support@company.com" className="u-email">myname@mail.com</a></p>
        </div>
    </div>

    <div className="footer-right">
        <p className="footer-company-about">
            <span>Sobre el broker</span>
            En este broker se realizan operaciones binarias
        </p>


    </div>
</footer>

    )
}

export default FooterLanding