import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../../styles/components/Details.module.scss';

const Details = () => {
	// Hook data and location from Link
	const data = useLocation();
	const navigate = useNavigate();

	// Manage link dropdown toggle
	const [links, toggleLinks] = useState(false);

	const handleLinks = () => {
		toggleLinks((state) => !state);
	};

	return (
		<div className={styles['details__container']}>
			<button onClick={() => navigate(-1)} className={styles['details__close']}>X</button>
			<p className={styles['details__name']}>{data.state.name}</p>
			<div className={styles['details__body']}>
				<div className={styles['details__img']}>
					<img src={data.state.cover} alt='' />
				</div>
				<div className={styles['details__info']}>
					<div className={styles['details__subinfo']}>
						<div>
							<p>{data.state.platforms} </p>
						</div>
						<div>
							<p className={styles['star']}>{data.state.rating}</p>
						</div>
					</div>
					<p>Genres: {data.state.genres}</p>
					<p>Companies: {data.state.companies}</p>
					<p>Release Date: {data.state.releaseDate}</p>
				</div>
			</div>
			<p className={styles['details__summary']}>{data.state.summary}</p>
			<div className={styles['details__buttons']}>
				<button>Add to Library</button>
				<button>Remove from Library</button>
				{data.state.urls && (
					<button
						className={styles['details__linksHolder']}
						onClick={handleLinks}
					>
						Links
						{links && (
							<ul className={styles['details__links']}>
								{data.state.urls.map((el) => (
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
	);
};

export default Details;
