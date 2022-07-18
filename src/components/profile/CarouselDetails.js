import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../../styles/components/Details.module.scss';

const CarouselDetails = () => {
	const { state } = useLocation();
	const data = state.x;
	const navigate = useNavigate();

	const closeModal = () => {
		navigate(-1);
	};

	return (
		<div
			className={styles['carouselDetails__wrapper']}
			onClick={closeModal}
		>
			<div
				className={styles['carouselDetails__container']}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className={styles['carouselDetails__close']}
					onClick={closeModal}
				>
					X
				</button>
				<button className={styles['carouselDetails__delete']}>
					DELETE
				</button>
				<img
					className={styles['carouselDetails__image']}
					src={data.url}
					alt=''
				/>
			</div>
		</div>
	);
};

export default CarouselDetails;
