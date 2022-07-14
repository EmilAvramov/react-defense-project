import { useState, useEffect } from "react";

import { db } from "../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetAllUserGames = (uid) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const collectionRef = collection(db, 'games')

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const q = query(collectionRef('games'), where('user', '==', uid))
                const collection = await getDocs(q)
                collection.forEach(doc => {
                    setData(prevData => ({...prevData, doc}))
                })
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        getData();
    })

    return { data, loading, error }
}

export default useGetAllUserGames;