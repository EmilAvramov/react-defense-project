import ProfileLibraryActions from './ProfileLibraryActions';
import ProfileLibraryCarousel from './ProfileLibraryCarousel';

import styles from '../../styles/components/Profile.module.scss';

const ProfileLibraryCard = (props) => {
	return (
		<section className={styles['card__wrapper']}>
			<div className={styles['card__img']}>
				<img src={props.cover} alt='' />
			</div>
			<h3 className={styles['card__header']}>{props.name}</h3>
			<div className={styles['card__info']}>
				<p>Platforms: &nbsp;{props.platforms}</p>
				<p>Genres: &nbsp;{props.genres}</p>
				<p>Companies: &nbsp;{props.companies}</p>
				<p>Release Date: &nbsp;{props.releaseDate}</p>
				<p>Rating: &nbsp;{props.rating}</p>
			</div>

			<ProfileLibraryCarousel doc={props.doc} />
			<ProfileLibraryActions
				doc={props.doc}
				change={props.change}
				user={props.user}
				urls={props.urls}
			/>
		</section>
	);
};

export default ProfileLibraryCard;
