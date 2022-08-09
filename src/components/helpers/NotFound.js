import styles from '../../styles/components/Helpers.module.scss';

const NotFound = () => {
	return (
		<div className={styles['notFound__container']}>
			The page you are looking for does not exist. Please check the
			address or try again.
		</div>
	);
};

export default NotFound;
