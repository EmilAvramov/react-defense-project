import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../../styles/components/Details.module.scss';

const Details = () => {
	// Hook data and location from Link
	const { state } = useLocation();
	const navigate = useNavigate();

	// Manage link dropdown toggle
	const [links, toggleLinks] = useState(false);

	const handleLinks = () => {
		toggleLinks((state) => !state);
	};

	// Manage overlay scroll and padding when modal is on
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (show) {
			document.body.style.overflowY = 'hidden';
			document.body.style.paddingRight = '17px';
		} else {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0px';
		}
	}, [show]);

	const closeModal = () => {
		setShow(false);
		navigate(-1);
	};

	return (
		<div className={styles['details__wrapper']} onClick={closeModal}>
			<div className={styles['details__container']}>
				<button
					onClick={closeModal}
					className={styles['details__close']}
				>
					X
				</button>
				<p className={styles['details__name']}>{state.data.name}</p>
				<div className={styles['details__body']}>
					<div className={styles['details__img']}>
						<img src={state.data.cover} alt='' />
					</div>
					<div className={styles['details__info']}>
						<div className={styles['details__subinfo']}>
							<div>
								<p>{state.data.platforms} </p>
							</div>
							<div>
								<p className={styles['star']}>
									{state.data.rating}
								</p>
							</div>
						</div>
						<p>Genres: {state.data.genres}</p>
						<p>Companies: {state.data.companies}</p>
						<p>Release Date: {state.data.releaseDate}</p>
					</div>
				</div>
				<p className={styles['details__summary']}>
					{state.data.summary}
				</p>
				<div className={styles['details__buttons']}>
					<button>Add to Library</button>
					<button>Remove from Library</button>
					{state.data.urls && (
						<button
							className={styles['details__linksHolder']}
							onClick={handleLinks}
						>
							Links
							{links && (
								<ul className={styles['details__links']}>
									{state.data.urls.map((el) => (
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
					<button>Community</button>
				</div>
			</div>
		</div>
	);
};

export default Details;
