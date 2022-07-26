import { useNavigate } from 'react-router-dom';

import styles from '../../styles/components/Helpers.module.scss';

const Confirm = ({ action, handle }) => {
	const navigate = useNavigate();

	const sendConfirm = () => {
		action();
		navigate(-2);
	};

	const closeModal = () => {
		handle(false);
	};

	return (
		<div className={styles['confirm__wrapper']}>
			<div className={styles['confirm__container']}>
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
