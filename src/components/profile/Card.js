import { useState } from 'react';

import useRemoveGameInternal from '../../hooks/useRemoveGameInternal';
import useUploadImages from '../../hooks/useUploadImages';
import updateUserGame from '../../functions/updateUserGame';

import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const Card = (props) => {
	// Prepare upload hook and state
	const [file, setFile] = useState();
	const { upload, uploadError, percent, url } = useUploadImages();

	const selectHandler = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = () => {
		if (!file) {
			alert('Please select a file first');
		} else {
			upload(file);
			updateUserGame(props.doc, url);
		}
	};

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
			<input
				className={styles['card__image']}
				type='file'
				accept='/image/*'
				onChange={selectHandler}
			/>
			{uploadError ? (
				<Err error={uploadError} />
			) : (
				<button
					className={styles['card__upload']}
					onClick={uploadHandler}
				>
					Upload Image
				</button>
			)}
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
