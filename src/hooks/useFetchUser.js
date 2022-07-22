import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../config/firebase-config';
import { query, collection, getDocs, where } from 'firebase/firestore';

const useFetchUser = (currentUser) => {
    // Set states and prepare hooks
	const [userLoading, setUserLoading] = useState(false);
	const [name, setName] = useState();
    const [userError, setUserError] = useState()
    const navigate = useNavigate();
	
	useEffect(() => {
        // If user is set, then fetch data
        if (currentUser) {
            const fetchUserName = async () => {
                try {
                    setUserLoading(true);
                    const q = query(
                        collection(db, 'users'),
                        where('uid', '==', currentUser.uid)
                    );  
                    const doc = await getDocs(q);
                    const data = doc.docs[0].data();
                    setName(data.name)
                    setUserLoading(false);
                } catch (err) {
                    setUserLoading(false);
                    setUserError(err)
                }
            };
            fetchUserName();
        }
        // Otherwise redirect to home (if bug occurs)
        else {
            return navigate('/');
        }
	}, [currentUser, navigate]);

	return { name, userLoading, userError };
};

export default useFetchUser;
