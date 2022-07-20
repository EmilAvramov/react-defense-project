import { ref, list } from 'firebase/storage';
import { storage } from '../config/firebase-config';

const getAllScreenshots = async () => {
	const storageRef = ref(storage, 'screenshots');
	const screenshots = await list(storageRef);

	return screenshots.items.length;
};

export default getAllScreenshots;
