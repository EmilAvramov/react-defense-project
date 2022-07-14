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
			<button
				className={styles['card__remove']}
				onClick={() => {
					removeGame();
					props.change();
				}}
			>
				Remove
			</button>
			<button className={styles['card__links']}>Links</button>
			<button className={styles['card__community']}>Community</button>
		</section>
	);
};

export default Card;
