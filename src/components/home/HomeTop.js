import Err from '../helpers/Error';
import styles from '../../styles/components/Home.module.scss';

const HomeTop = ({ currentUser, userError, name }) => {
	return (
		<div className={styles['home__top']}>
			{currentUser ? (
				userError ? (
					<Err error={userError} styles={'home__top'} />
				) : (
					<>Currently browsing as {name}</>
				)
			) : (
				<>Currently browsing as Guest</>
			)}
		</div>
	);
};

export default HomeTop;
