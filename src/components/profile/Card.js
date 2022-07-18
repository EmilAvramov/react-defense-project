import { useState, useEffect } from 'react';

import useGetGameScreenshots from '../../hooks/useGetGameScreenshots';
import useRemoveGameInternal from '../../hooks/useRemoveGameInternal';
import useUploadImages from '../../hooks/useUploadImages';
import updateUserGame from '../../functions/updateUserGame';

import Loader from '../helpers/GridLoader';
import Carousel from '../helpers/Carousel';
import Err from '../helpers/Error';

import styles from '../../styles/components/Profile.module.scss';

const Card = (props) => {
	// Prepare upload hook and state
	const [file, setFile] = useState();
	const { upload, uploadError, percent, url } = useUploadImages();
	const { screenshots, fetchError, loading } = useGetGameScreenshots(
		props.doc
	);

	console.log(percent);

	// Add screenshot to gallery
	useEffect(() => {
		if (url) {
			updateUserGame(props.doc, url);
		}
	}, [props.doc, url]);

	// Handle changes related to uploads
	const selectHandler = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = () => {
		if (!file) {
			alert('Please select a file first');
		} else {
			upload(file);
			setFile('');
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
			{fetchError ? (
				<Err error={fetchError} />
			) : (
				<Carousel data={screenshots} />
			)}

			<input
				className={styles['card__image']}
				type='file'
				accept='/image/*'
				onChange={selectHandler}
			/>
			{uploadError ? (
				<Err error={uploadError} />
			) : loading ? (
				<Loader loading={loading} />
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
