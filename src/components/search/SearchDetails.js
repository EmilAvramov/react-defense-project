import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import addGameToLibrary from '../../functions/addGameToLibrary';
import delGameFromLibrary from '../../functions/delGameFromLibrary';
import useCheckExistsInternal from '../../hooks/useCheckExistsInternal';

import styles from '../../styles/components/Details.module.scss';

const SearchDetails = () => {
	// Get current user if logged in
	const { currentUser } = useAuth();

	// Hook data and location from Link
	const { state } = useLocation();
	const data = state.data;
	const navigate = useNavigate();

	// Manage link dropdown toggle
	const [links, toggleLinks] = useState(false);

	const handleLinks = () => {
		toggleLinks((state) => !state);
	};

	// Close modal and go back to search page
	const closeModal = () => {
		navigate(-1);
	};

	// Manage database Create-Delete operations
	const { exists, docRef, error, handleTrigger } = useCheckExistsInternal(
		data,
		currentUser
	);
	const [added, setAdded] = useState(false);
	const { addGame } = addGameToLibrary();
	const { removeGame } = delGameFromLibrary();

	useEffect(() => {
		exists ? setAdded(true) : setAdded(false);
	}, [exists]);

	const addHandler = () => {
		if (!added) {
			addGame(data, currentUser);
			setAdded(true);
			handleTrigger();
		} else {
			alert(error.message);
		}
	};

	const removeHandler = () => {
		if (added) {
			removeGame(docRef);
			setAdded(false);
		} else {
			alert(error.message);
		}
	};

	return (
		<div className={styles['details__wrapper']} onClick={closeModal}>
			<div
				className={styles['details__container']}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={closeModal}
					className={styles['details__close']}
				>
					X
				</button>
				<p className={styles['details__name']}>{data.name}</p>
				<div className={styles['details__body']}>
					<div className={styles['details__img']}>
						<img src={data.cover} alt='' />
					</div>
					<div className={styles['details__info']}>
						<div className={styles['details__subinfo']}>
							<div>
								<p>{data.platforms} </p>
							</div>
							<div>
								<p className={styles['star']}>{data.rating}</p>
							</div>
						</div>
						<p>Genres: {data.genres}</p>
						<p>Companies: {data.companies}</p>
						<p>Release Date: {data.releaseDate}</p>
						<div className={styles['details__buttons']}>
							{currentUser ? (
								!added ? (
									<button onClick={addHandler}>
										Add to Library
									</button>
								) : (
									<button onClick={removeHandler}>
										Remove from Library
									</button>
								)
							) : (
								<></>
							)}
							{data.urls && (
								<button
									className={styles['details__linksHolder']}
									onClick={handleLinks}
								>
									Links
									{links && (
										<ul
											className={styles['details__links']}
										>
											{data.urls.map((el) => (
												<li key={el[0]}>
													<a
														href={el[1]}
														target='_blank'
														rel='noreferrer'
													>
														{el[0]}
													</a>
												</li>
											))}
										</ul>
									)}
								</button>
							)}
						</div>
					</div>
				</div>
				<p className={styles['details__summary']}>{data.summary}</p>
			</div>
		</div>
	);
};

export default SearchDetails;
