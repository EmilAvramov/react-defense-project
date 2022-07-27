import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

import aggregateData from '../../functions/aggregateData';

import styles from '../../styles/components/Home.module.scss';

const HomeCarousel = ({ data }) => {
	const filtered = aggregateData(data);
	const slides = filtered.map((x, i) => (
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
				{slides}
			</Swiper>
		</div>
	);
};
export default HomeCarousel;