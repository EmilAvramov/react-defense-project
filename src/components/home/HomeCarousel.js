import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from '../../styles/components/Home.module.scss';

const HomeCarousel = ({ data }) => {
	const slides = data.map((x, i) => (
		<SwiperSlide key={i} className={styles['home__card']}>
			<img src={x.cover} alt='' />
		</SwiperSlide>
	));

	return (
		<div className={styles['home__list']}>
			<Swiper
				className={styles['home__carousel']}
				modules={[Navigation]}
				slidesPerView={3}
				navigation={true}
			>
				{slides.length > 0 ? (
					slides
				) : (
					<div className={styles['home__empty']}>
						No games added yet.
					</div>
				)}
			</Swiper>
		</div>
	);
};
export default HomeCarousel;
