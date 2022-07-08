import styles from '../../styles/components/Details.module.scss';

const Details = ({details, single, hasToken}) => {
	console.log(single.genres[0].name)
	const genres = []
	const platforms = []
	const companies = []
	single.genres.forEach(el => genres.push(el.name))
	single.platforms.forEach(el => platforms.push(el.abbreviation))
	single.involved_companies.forEach(el => companies.push(el.company.name))
	console.log(genres)
	const imgCover = single.cover.url.replace('t_thumb', 't_cover_big');
	return (
		<div className={styles['details__container']}>
            <button onClick={() => details()} className={styles['details__close']}>X</button>
			<p className={styles['details__name']}>{single.name}</p>
			<div className={styles['details__body']}>
				<div className={styles['details__img']}>				
					<img
						src={imgCover}
						alt=''
					/>
				</div>
				<div className={styles['details__info']}>
					<div className={styles['details__subinfo']}>
						<div>
							<p>{platforms.join(', ')} </p>
						</div>
						<div>
							<p className={styles['star']}>{Math.floor(single.total_rating)}</p>
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
				<button>Visit Website</button>
				<button>Community</button>
			</div>
		</div>
	);
};

export default Details;
