import { useNavigate } from 'react-router-dom';

import styles from '../../styles/components/Helpers.module.scss';

const Confirm = ({ action, handle, location }) => {
	const navigate = useNavigate();

	const sendConfirm = () => {
		action();
		location === 'account' ? navigate('/') : navigate('/profile/library');
	};

	const closeModal = () => {
		handle(false);
	};

	return (
		<div className={styles['confirm__wrapper']} onClick={closeModal}>
			<div
				className={styles['confirm__container']}
				onClick={(e) => e.stopPropagation()}
			>
				<p className={styles['confirm__text']}>
					Are you sure you want to do that?
				</p>
				<button
					className={styles['confirm__yes']}
					onClick={sendConfirm}
				>
					Yes
				</button>
				<button className={styles['confirm__no']} onClick={closeModal}>
					No
				</button>
			</div>
		</div>
	);
};

export default Confirm;
