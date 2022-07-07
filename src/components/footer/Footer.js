import '../../styles/components/Footer.module.scss'

const Footer = () => {
    return (
        <footer>
            <div><a href="https://">Back to top</a></div>
            <ul> Need assistance? Contact us!
                <li><i className="fa-solid fa-phone"></i>Phone: +XXX XXXX XXXX</li>
                <li><i className="fa-solid fa-envelope"></i>Email: supportemail@gameblob.com</li>
            </ul>
        </footer>
    )
}

export default Footer;