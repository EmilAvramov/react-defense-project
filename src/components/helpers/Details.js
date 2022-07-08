import styles from '../../styles/components/Details.module.scss';

const Details = ({details, single, hasToken}) => {
	return (
		<div className={styles['details__container']}>
            <button onClick={() => details()} className={styles['details__close']}>X</button>
			<p className={styles['details__name']}>{single.name}</p>
			<div className={styles['details__body']}>
				<div className={styles['details__img']}>				
					<img
						src={single.cover.url}
						alt=''
					/>
				</div>
				<div className={styles['details__info']}>
					<div className={styles['details__subinfo']}>
						<div>
							<p>PC</p>
						</div>
						<div>
							<p>8.0</p>
						</div>
					</div>
					<p>Genre</p>
					<p>Publisher</p>
					<p>Release Date</p>
				</div>
			</div>
			<p className={styles['details__summary']}>Summary</p>
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
