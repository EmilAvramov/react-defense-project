import gaming from '../../assets/about__gaming.png';
import data from '../../assets/about__data.png';
import search from '../../assets/about__search.png';
import library from '../../assets/about__library.png';
import screenshot from '../../assets/about__screenshot.png';
import retro from '../../assets/about__retro.png';
import pacman from '../../assets/about__pacman.png';
import browse from '../../assets/about__browse.png';

import styles from '../../styles/components/About.module.scss';

const About = () => {
	return (
		<div className={styles['about__wrapper']}>
			<section className={styles['about__block']}>
				<div className={styles['about__block_text']}>
					<p>
						Gameblob was created for gamers to be able to keep track
						of their games, store and share screenshots and browse
						all available games for PC, PS4, PS5, XBOX and Switch.
						The platform offers a library for each user, which
						contains all added games and their respective
						screenshots.
					</p>
					<p>
						Guests of the website can still use some of the
						features, but for the best experience a registration is
						recommended, as it offers access to the library and the
						ability to upload screenshots.
					</p>
				</div>

				<div className={styles['about__block_img']}>
					<img src={gaming} alt='' />
				</div>
			</section>
			<section className={styles['about__block']}>
				<div className={styles['about__block_img']}>
					<img src={data} alt='' />
				</div>
				<div className={styles['about__block_text']}>
					<p>
						Gameblob offers direct search access to IGDB, which
						hosts a database for all games on the market, old and
						new. You can view different details about the games,
						including any available links to other platforms such as
						Steam, GOG and official websites.
					</p>
					<p>
						Users of Gameblob can search either for specific games,
						or for games published by a specific company. Searching
						by platform is also available. Each search query will
						return 150 results, so for larger queries, it is
						recommended to apply more filters to narrow down the
						results.
					</p>
				</div>
			</section>
			<section className={styles['about__feature']}>
				<h3 className={styles['about__feature_heading']}>
					Gameblob Features
				</h3>
				<div className={styles['about__feature_wrapper']}>
					<div className={styles['about__feature_block']}>
						<img src={search} alt='' />
						<h6>IGDB search access</h6>
						<p>
							Browse, view and add all games on the market to your
							library, both new and old.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<img src={library} alt='' />
						<h6>Your personal library</h6>
						<p>
							Gameblob offers users a library of their own, which
							can be adjusted as needed.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<img src={screenshot} alt='' />
						<h6>Your screenshot space</h6>
						<p>
							Upload your own screenshots to your library and
							organize them per game as you wish.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<img src={retro} alt='' />
						<h6>Retro-style theme</h6>
						<p>
							Enjoy an old-school game feel, mixed with excellent
							modern browser functionality.
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<img src={browse} alt='' />
						<h6>Minimal loading times</h6>
						<p>
							Gameblob offers minimal loading times and a fluid
							experience. Browse faster!
						</p>
					</div>
					<div className={styles['about__feature_block']}>
						<img src={pacman} alt='' />
						<h6>Pac-man is awesome!</h6>
						<p>
							Pac-man is our mascot and he feels good about it!
							Who remembers Pac-man?
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
