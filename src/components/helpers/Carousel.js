import { Swiper, SwiperSlide } from 'swiper/react';

import styles from '../../styles/components/Profile.module.scss';
import 'swiper/scss';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';

const Carousel = ({ data }) => {
	const screenshots = data.map((x, i) => (
		<SwiperSlide key={i} className={styles['card__swiper_slide']}>
			<img
				className={styles['card__swiper_img']}
				src={x.imageUrl}
				alt=''
			/>
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
