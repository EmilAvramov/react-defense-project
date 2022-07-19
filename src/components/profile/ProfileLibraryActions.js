import { useState, useEffect, useRef } from 'react';

import useRemoveGameInternal from '../../hooks/useRemoveGameInternal';
import useUploadImages from '../../hooks/useUploadImages';

import Loader from '../helpers/GridLoader';
import Err from '../helpers/Error';
import styles from '../../styles/components/Profile.module.scss';

const ProfileLibraryActions = ({ doc, change }) => {
	// Prepare upload hook and state
	const [file, setFile] = useState();
	const { upload, uploadError, loading } = useUploadImages(doc);
	const inputDialog = useRef(null);

	// Add screenshot to gallery
	useEffect(() => {
		if (file) {
			upload(file, doc);
			setFile('');
		}
	}, [file, upload, doc]);

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
				) : loading ? (
					<Loader loading={loading} />
				) : (
					<button disabled={loading} onClick={uploadHandler}>
						Upload Image
					</button>
				)}
			</div>
		</>
	);
};

export default ProfileLibraryActions;
