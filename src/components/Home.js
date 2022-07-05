import styles from '../styles/components/Home.module.scss'

const Home = () => {
    return (
        <main className={styles['home__container']}>
            <div className={styles['card']}>
                <h3>Dragon Age: Origins - Awakening</h3>
                <img src="//images.igdb.com/igdb/image/upload/t_thumb/ari8i.jpg" alt="" />
                <button>Details</button>
            </div>
        </main>
    )
}

export default Home;