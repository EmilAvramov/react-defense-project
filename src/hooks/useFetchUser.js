import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../config/firebase-config';
import { query, collection, getDocs, where } from 'firebase/firestore';

const useFetchUser = (currentUser) => {
    // Set states and prepare hooks
	const [name, setName] = useState();
    const [userError, setUserError] = useState()
    const navigate = useNavigate();
	
	useEffect(() => {
        // If user is set, then fetch data
        setTimeout(() => {
            if (currentUser) {
                const fetchUserName = async () => {
                    try {
                        const q = query(
                            collection(db, 'users'),
                            where('uid', '==', currentUser.uid)
                        );  
                        const doc = await getDocs(q);
                        const data = doc.docs[0].data();
                        setName(data.name)
                    } catch (err) {
                        setUserError(err)
                    }
                };
                fetchUserName();
            }
        }, 2000)

	}, [currentUser, navigate]);

	return { name, userError };
};

export default useFetchUser;
