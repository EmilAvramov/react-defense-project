import useRemoveGameInternal from '../../hooks/useRemoveGameInternal';

import styles from '../../styles/components/Profile.module.scss';

const Card = (props) => {
	// Prepare delete action
	const { removeGame } = useRemoveGameInternal(props.doc);

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
			<div className={styles['card__screenshots']}>images go here</div>
			<div className={styles['card__buttons']}>
				<button
					onClick={() => {
						removeGame();
						props.change();
					}}
				>
					Remove
				</button>
				<button>Links</button>
				<button>Community</button>
			</div>
		</section>
	);
};

export default Card;
