import { HashLink } from 'react-router-hash-link';

import styles from '../../styles/components/Footer.module.scss';

const Footer = () => {
	return (
		<footer>
			<div>
				<HashLink smooth to='#top' className={styles['footer__arrow']}>
					<i className='fa-solid fa-angle-up'></i>
				</HashLink>
			</div>
			<ul>
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
