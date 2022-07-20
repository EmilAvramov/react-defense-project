import { Link } from 'react-router-dom'

import '../../styles/components/Footer.module.scss'

const Footer = () => {
    return (
        <footer>
            <div><Link to='/'>Back to top</Link></div>
            <ul> Need assistance? Contact us!
                <li><i className="fa-solid fa-phone"></i>Phone: +123 4567 8900</li>
                <li><i className="fa-solid fa-envelope"></i>Email: support@gameblob.com</li>
            </ul>
        </footer>
    )
}

export default Footer;