import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/css/navigation';

import { useLibrary } from '../../contexts/LibraryContext';
import useGetGameScreenshots from '../../hooks/useGetGameScreenshots';

import Loader from '../helpers/GridLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibraryCarousel = ({ doc }) => {
	// Prepare upload hook and state
	const { changed } = useLibrary();
	const { screenshots, fetchError, loading, handleRequest } =
		useGetGameScreenshots(doc);

	const location = useLocation();

	// Update screenshots when handler is triggered
	useEffect(() => {
		handleRequest();
	}, [changed]);

	const data = screenshots.map((x, i) => (
		<SwiperSlide key={i} className={styles['card__swiper_slide']}>
			<Link
				to={`/profile/library/${x.id}`}
				state={{ x, doc, carouselBackground: location }}
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
				{fetchError ? (
					<Err error={fetchError} />
				) : loading ? (
					<Loader loading={loading} />
				) : (
					data
				)}
			</Swiper>
		</div>
	);
};
export default ProfileLibraryCarousel;
