import { useState, useEffect } from "react"

import { collection, getDocs } from "firebase/firestore"
import { db } from "../config/firebase-config"

const useGetGameScreenshots = (unique) => {
    const [screenshots, setScreenshots] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState()

    useEffect(() => {
        setLoading(true)
        try {
            const getScreenshots = async () => {
                const docRef = collection(db, 'games', unique, 'screenshots')
                const request = await getDocs(docRef)
                let imageUrls = request.docs.map(doc => ({...doc.data()}))
                setScreenshots(imageUrls)
            } 
            getScreenshots()
        } catch (err) {
            setFetchError(err)
        }

        setLoading(false)
    }, [unique])

    return { screenshots, loading, fetchError}
}

export default useGetGameScreenshots