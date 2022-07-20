import { collection, getDocs } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const getAllGames = async () => {
	const gamesRef = collection(db, 'games');
	const games = await getDocs(gamesRef);
	
	return games.size;
};

export default getAllGames;
