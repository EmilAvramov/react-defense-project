import { useState } from 'react';
import styles from '../../styles/components/Details.module.scss';

const Details = ({ details, single, hasToken }) => {
	const [links, toggleLinks] = useState(false);

	const imgCover = single.cover.url.replace('t_thumb', 't_cover_big');
	const genres = [];
	const platforms = [];
	const companies = [];
	const urls = [];
	const categories = {
		1: 'Official',
		3: 'Wikipedia',
		10: 'iOS',
		12: 'Android',
		13: 'Steam',
		17: 'GOG',
	};
	single.genres.forEach((el) => genres.push(el.name));
	single.platforms.forEach((el) => platforms.push(el.abbreviation));
	single.involved_companies.forEach((el) => companies.push(el.company.name));
	single.websites.forEach((el) => {
		if (
			(el.category === 1 ||
				el.category === 3 ||
				el.category === 10 ||
				el.category === 12 ||
				el.category === 13 ||
				el.category === 17)
		) {
			urls.push([categories[el.category], el.url]);
		}
	});

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
			<p className={styles['details__name']}>{single.name}</p>
			<div className={styles['details__body']}>
				<div className={styles['details__img']}>
					<img src={imgCover} alt='' />
				</div>
				<div className={styles['details__info']}>
					<div className={styles['details__subinfo']}>
						<div>
							<p>{platforms.join(', ')} </p>
						</div>
						<div>
							<p className={styles['star']}>
								{Math.floor(single.total_rating)}
							</p>
						</div>
					</div>
					<p>Genres: {genres.join(', ')}</p>
					<p>Companies: {companies.join(', ')}</p>
					<p>Release Date: {single.release_dates[0].human}</p>
				</div>
			</div>
			<p className={styles['details__summary']}>{single.summary}</p>
			<div className={styles['details__buttons']}>
				<button>Add to Library</button>
				{!hasToken && <button>Remove from Library</button>}
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
				<button>Community</button>
			</div>
		</div>
	);
};

export default Details;
