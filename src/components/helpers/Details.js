import { useState } from 'react';
import styles from '../../styles/components/Details.module.scss';
import placeholder from '../../assets/no-image.png';

const Details = ({ details, single, hasToken }) => {
	const [links, toggleLinks] = useState(false);
	const allowedPlatforms = ['PC', 'XBOX', 'PS5', 'PS4', 'Switch'];
	const categories = {
		1: 'Official',
		3: 'Wikipedia',
		10: 'iOS',
		12: 'Android',
		13: 'Steam',
		17: 'GOG',
	};

	let imgCover;
	const genres = [];
	const platforms = [];
	const companies = [];
	const urls = [];

	if (single.cover) {
		imgCover = single.cover.url.replace('t_thumb', 't_cover_big');
	} else {
		imgCover = placeholder;
	}

	if (single.genres) {
		single.genres.forEach((el) => genres.push(el.name));
	} else {
		genres.push('No data available');
	}
	single.platforms.forEach((el) => {
		if (allowedPlatforms.includes(el.abbreviation)) {
			platforms.push(el.abbreviation);
		}
	});

	if (single.involved_companies) {
		single.involved_companies.forEach((el) =>
			companies.push(el.company.name)
		);
	} else {
		companies.push('No data available');
	}

	if (single.websites) {
		single.websites.forEach((el) => {
			if (
				el.category === 1 ||
				el.category === 3 ||
				el.category === 10 ||
				el.category === 12 ||
				el.category === 13 ||
				el.category === 17
			) {
				urls.push([categories[el.category], el.url]);
			}
		});
	}

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
				{single.websites && (
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
