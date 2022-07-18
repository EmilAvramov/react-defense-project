import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../../styles/components/Details.module.scss';

const CarouselDetails = () => {
	const { state } = useLocation();
	console.log(state);
	const data = state.x;
	const navigate = useNavigate();

	return (
		<div className={styles['carouselDetails__container']}>
			<img
				className={styles['carouselDetails__image']}
				src={data.url}
				alt=''
			/>
		</div>
	);
};

export default CarouselDetails;
