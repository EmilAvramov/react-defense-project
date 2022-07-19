import useGetGameScreenshots from '../../hooks/useGetGameScreenshots';

import ProfileLibraryActions from './ProfileLibraryActions';
import Loader from '../helpers/GridLoader';
import ProfileLibraryCarousel from './ProfileLibraryCarousel';
import Err from '../helpers/Error';

import styles from '../../styles/components/Profile.module.scss';

const ProfileLibraryCard = (props) => {
	// Prepare upload hook and state
	const { screenshots, fetchError, loading } = useGetGameScreenshots(
		props.doc
	);

	return (
		<section className={styles['card__wrapper']}>
			<div className={styles['card__img']}>
				<img src={props.cover} alt='' />
			</div>
			<h3 className={styles['card__header']}>{props.name}</h3>
			<div className={styles['card__info']}>
				<p>Platforms: {props.platforms}</p>
				<p>Genres: {props.genres}</p>
				<p>Companies: {props.companies}</p>
				<p>Release Date: {props.releaseDate}</p>
				<p>Rating: {props.rating}</p>
			</div>
			{loading ? (
				<Loader loading={loading} />
			) : fetchError ? (
				<Err error={fetchError} />
			) : (
				<ProfileLibraryCarousel data={screenshots} doc={props.doc}/>
			)}

			<ProfileLibraryActions doc={props.doc} change={props.change}/>
		</section>
	);
};

export default ProfileLibraryCard;
