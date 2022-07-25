import gaming from '../../assets/gaming.png';
import data from '../../assets/data.png';

import styles from '../../styles/components/About.module.scss';

const About = () => {
	return (
		<div className={styles['about__wrapper']}>
			<section className={styles['about__block']}>
				<p className={styles['about__block_text']}>
					Gameblob was created for gamers to be able to keep track of
					their games, store and share screenshots and browse all
					available games for PC, PS4, PS5, XBOX and Switch. The
					platform offers a library for each user, which contains all
					added games and their respective screenshots.
				</p>
				<div className={styles['about__block_img']}>
					<img src={gaming} alt='' />
				</div>
			</section>
			<section className={styles['about__block']}>
				<div className={styles['about__block_img']}>
					<img src={data} alt='' />
				</div>
				<p className={styles['about__block_text']}>
					Gameblob offers direct search access to IGDB, which hosts a
					database for all games on the market, old and new. You can
					view different details about the games, including any
					available links to other platforms such as Steam, GOG and
					official websites.
				</p>
			</section>
			<section className={styles['about__feature']}>
				<h3 className={styles['about__feature_heading']}>
					Gameblob Features
				</h3>
				<div className={styles['about__feature_wrapper']}>
					<div className={styles['about__feature_block']}>
						<h6>IGDB search access</h6>
						<p>
							Browse, view and add all games on the market to your
							library, both new and old.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<h6>Your personal library</h6>
						<p>
							Gameblob offers users a library of their own, which
							can be adjusted as needed.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<h6>Your screenshot space</h6>
						<p>
							Upload your own screenshots to your libray and
							organize them per game.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<h6>Convenience at a glance</h6>
						<p>
							Search, organize and manage your games intuitively
							and conveniently.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<h6>Minimal loading times</h6>
						<p>
							Gameblob offers minimal loading times and a fluid
							experience.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<h6>Pac-man is awesome!</h6>
						<p>Pac-man is our mascot and he feels good about it!</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
