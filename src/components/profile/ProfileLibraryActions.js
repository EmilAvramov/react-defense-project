import { useState, useEffect, useRef } from 'react';

import useRemoveGameInternal from '../../hooks/useRemoveGameInternal';
import updateUserGame from '../../functions/updateUserGame';
import useUploadImages from '../../hooks/useUploadImages';

import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibraryActions = ({ doc, change }) => {
	// Prepare upload hook and state
	const [file, setFile] = useState();
	const { upload, uploadError, url, name } = useUploadImages();
	const inputDialog = useRef(null);

	// Add screenshot to gallery
	useEffect(() => {
		if (url) {
			updateUserGame(doc, url, name);
		}
	}, [doc, url, name]);

	useEffect(() => {
		if (file) {
			upload(file);
			setFile('');
		}
	}, [file, upload]);

	// Handle changes related to uploads
	const attachFile = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = () => {
		inputDialog.current.click();
	};

	// Prepare delete action
	const { removeGame } = useRemoveGameInternal(doc);

	return (
		<>
			<input
				type='file'
				accept='/image/*'
				ref={inputDialog}
				onChange={attachFile}
				style={{ display: 'none' }}
			/>
			<div className={styles['card__buttons']}>
				<button
					onClick={() => {
						removeGame();
						change();
					}}
				>
					Remove
				</button>
				<button>Links</button>
				{uploadError ? (
					<Err error={uploadError} />
				) : (
					<button onClick={uploadHandler}>Upload Image</button>
				)}
			</div>
		</>
	);
};

export default ProfileLibraryActions;
