import { Link } from 'react-router-dom';

import styles from '../../styles/components/Footer.module.scss';

const Footer = () => {
	return (
		<footer>
			<div>
				<Link to='/' className={styles['footer__arrow']}>
					<i className='fa-solid fa-angle-up'></i>
				</Link>
			</div>
			<ul>
				{' '}
				Need assistance? Contact us!
				<li>
					<i className='fa-solid fa-phone'></i>Phone: +123 4567 8900
				</li>
				<li>
					<i className='fa-solid fa-envelope'></i>Email:
					support@gameblob.com
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
