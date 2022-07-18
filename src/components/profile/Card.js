import { useState, useEffect, useRef } from 'react';

import useGetGameScreenshots from '../../hooks/useGetGameScreenshots';
import useRemoveGameInternal from '../../hooks/useRemoveGameInternal';
import useUploadImages from '../../hooks/useUploadImages';
import updateUserGame from '../../functions/updateUserGame';

import Loader from '../helpers/GridLoader';
import Carousel from './Carousel';
import Err from '../helpers/Error';

import styles from '../../styles/components/Profile.module.scss';

const Card = (props) => {
	// Prepare upload hook and state
	const [file, setFile] = useState();
	const { upload, uploadError, url } = useUploadImages();
	const { screenshots, fetchError, loading } = useGetGameScreenshots(
		props.doc
	);
	const inputDialog = useRef(null);

	// Add screenshot to gallery
	useEffect(() => {
		if (url) {
			updateUserGame(props.doc, url);
		}
	}, [props.doc, url]);

	useEffect(() => {
		if (file) {
			upload(file);
			setFile('');
		}
	}, [file, upload]);

	// Handle changes related to uploads
	const attachFile = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = () => {
		inputDialog.current.click();
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
			{loading ? (
				<Loader loading={loading} />
			) : fetchError ? (
				<Err error={fetchError} />
			) : (
				<Carousel data={screenshots} />
			)}

			<input
				type='file'
				accept='/image/*'
				ref={inputDialog}
				onChange={attachFile}
				style={{ display: 'none' }}
			/>
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
				{uploadError ? (
					<Err error={uploadError} />
				) : (
					<button onClick={uploadHandler}>Upload Image</button>
				)}
			</div>
		</section>
	);
};

export default Card;
