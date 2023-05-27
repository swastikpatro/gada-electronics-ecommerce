import styles from './Hero.module.css';

import jethalalBanner from '../../assets/jethalalBanner.png';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks';
const Hero = () => {
  const isMobile = useIsMobile();
  return (
    <section className='white-bcg'>
      <div className={`container ${styles.hero}`}>
        <article className={styles.content}>
          <h1>Experience Electronics Redefined: Unleash Innovation</h1>

          <p>
            Discover the Future of Electronics: Unleash Innovation, Immerse in
            Unparalleled Quality. Experience our cutting-edge technology and
            elevate your everyday with Gada Electronics. Explore the
            extraordinary today.
          </p>
          <Link to='/products' className={`btn ${styles.btnHero}`}>
            Shop now
          </Link>
        </article>

        {!isMobile && (
          <article className={styles.imageContainer}>
            <img
              src={jethalalBanner}
              alt='jethalal'
              className={styles.banner}
            />
          </article>
        )}
      </div>
    </section>
  );
};

export default Hero;
