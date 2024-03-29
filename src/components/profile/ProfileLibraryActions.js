import { useState, useEffect, useRef } from 'react';

import Confirm from '../helpers/Confirm';
import delGameFromLibrary from '../../functions/delGameFromLibrary';
import useUploadImages from '../../hooks/useUploadImages';
import processUrls from '../../functions/processUrls';

import { actionsCardLoader } from '../../styles/auxilary/loaderStyles';
import Loader from '../helpers/GridLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibraryActions = ({ doc, change, user, urls }) => {
	// Prepare upload hook and state
	const [file, setFile] = useState();
	const { upload, uploadError, loading } = useUploadImages();
	const inputDialog = useRef(null);

	// Add screenshot to gallery
	useEffect(() => {
		if (file) {
			upload(file, doc, user);
			setFile('');
		}
	}, [file, upload, doc, user]);

	// Handle changes related to uploads
	const attachFile = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = () => {
		inputDialog.current.click();
	};

	// Prepare delete action
	const { removeGame } = delGameFromLibrary();

	const handleDeleteGame = () => {
		try {
			removeGame(doc);
			change();
		} catch (err) {
			alert('An error occurred, please try again.');
		}
	};

	// Manage link dropdown toggle
	const [links, toggleLinks] = useState(false);

	const handleLinks = () => {
		toggleLinks((state) => !state);
	};

	// Handle delete confirmation
	const [confirm, setConfirm] = useState(false);

	const handleConfirm = () => {
		setConfirm((state) => !state);
	};

	return (
		<>
			<input
				type='file'
				accept='image/*'
				ref={inputDialog}
				onChange={attachFile}
				style={{ display: 'none' }}
			/>
			<div className={styles['card__buttons']}>
				<button onClick={handleConfirm}>Remove</button>
				{urls ? (
					<button
						className={styles['card__linksHolder']}
						onClick={handleLinks}
					>
						Links
						{links && (
							<ul className={styles['card__links']}>
								{processUrls(urls).map((el) => (
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
				) : (
					<button className={styles['card__linksHolder']}>
						Links
					</button>
				)}
				{loading ? (
					<Loader
						loading={loading}
						styles={actionsCardLoader}
						size={9}
					/>
				) : uploadError ? (
					<Err error={uploadError} styles={styles['card__error']} />
				) : (
					<button disabled={loading} onClick={uploadHandler}>
						Upload Image
					</button>
				)}
			</div>
			{confirm && (
				<Confirm
					action={handleDeleteGame}
					handle={setConfirm}
					location={'library'}
				/>
			)}
		</>
	);
};

export default ProfileLibraryActions;
