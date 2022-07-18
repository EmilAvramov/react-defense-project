import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/css/navigation';

import { Link, useLocation } from 'react-router-dom';

import styles from '../../styles/components/Profile.module.scss';

const Carousel = ({ data }) => {
	const location = useLocation();

	const screenshots = data.map((x, i) => (
		<SwiperSlide key={i} className={styles['card__swiper_slide']}>
			<Link
				to={`/profile/library/${x.id}`}
				state={{ x, carouselBackground: location }}
			>
				<img
					className={styles['card__swiper_img']}
					src={x.url}
					alt=''
				/>
			</Link>
		</SwiperSlide>
	));

	return (
		<div className={styles['card__swiper_container']}>
			<Swiper
				className={styles['card__swiper_body']}
				modules={[Navigation]}
				slidesPerView={3}
				navigation={true}
			>
				{screenshots}
			</Swiper>
		</div>
	);
};
export default Carousel;
