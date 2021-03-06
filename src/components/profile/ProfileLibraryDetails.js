import { useLocation, useNavigate } from 'react-router-dom';

import useRemoveScreenshot from '../../hooks/useRemoveScreenshot';

import styles from '../../styles/components/Details.module.scss';

const ProfileLibraryDetails = () => {
	// Get data from location and setup navigate
	const { state } = useLocation();
	const data = state.x;
	const navigate = useNavigate();

	// Handlers for delete/close actions
	const delScreenshot = () => {
		removeScreenshot();
		closeModal();
	};

	const closeModal = () => {
		navigate(-1);
	};

	// Delete function
	const { removeScreenshot } = useRemoveScreenshot(
		state.doc,
		data.doc,
		data.name
	);

	return (
		<div
			className={styles['carouselDetails__wrapper']}
			onClick={closeModal}
		>
			<div
				className={styles['carouselDetails__container']}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className={styles['carouselDetails__close']}
					onClick={closeModal}
				>
					X
				</button>
				<button
					className={styles['carouselDetails__delete']}
					onClick={delScreenshot}
				>
					DELETE
				</button>
				<img
					className={styles['carouselDetails__image']}
					src={data.url}
					alt=''
				/>
			</div>
		</div>
	);
};

export default ProfileLibraryDetails;
