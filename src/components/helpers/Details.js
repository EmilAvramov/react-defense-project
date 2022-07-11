import { useState } from 'react';

import useCleanData from '../../hooks/useCleanData';
import styles from '../../styles/components/Details.module.scss';

const Details = ({ details, single, hasToken }) => {
	const [links, toggleLinks] = useState(false);
	const {
		name,
		cover,
		summary,
		platforms,
		companies,
		rating,
		genres,
		releaseDate,
		urls,
	} = useCleanData(single);

	const handleLinks = () => {
		toggleLinks((state) => !state);
	};

	return (
		<div className={styles['details__container']}>
			<button
				onClick={() => details()}
				className={styles['details__close']}
			>
				X
			</button>
			<p className={styles['details__name']}>{name}</p>
			<div className={styles['details__body']}>
				<div className={styles['details__img']}>
					<img src={cover} alt='' />
				</div>
				<div className={styles['details__info']}>
					<div className={styles['details__subinfo']}>
						<div>
							<p>{platforms} </p>
						</div>
						<div>
							<p className={styles['star']}>
								{rating}
							</p>
						</div>
					</div>
					<p>Genres: {genres}</p>
					<p>Companies: {companies}</p>
					<p>Release Date: {releaseDate}</p>
				</div>
			</div>
			<p className={styles['details__summary']}>{summary}</p>
			<div className={styles['details__buttons']}>
				<button>Add to Library</button>
				{!hasToken && <button>Remove from Library</button>}
				{urls && (
					<button
						className={styles['details__linksHolder']}
						onClick={handleLinks}
					>
						Links
						{links && (
							<ul className={styles['details__links']}>
								{urls.map((el) => (
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
