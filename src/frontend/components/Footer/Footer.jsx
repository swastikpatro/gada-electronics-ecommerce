import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../constants/constants';
import styles from './Footer.module.css';

const Footer = () => {
  const presentYear = new Date().getFullYear();

  return (
    <section className={styles.footer}>
      <div className={styles.linksContainer}>
        {FOOTER_LINKS.map((singleLink) => (
          <Link key={singleLink.id} to={singleLink.url} target='_blank'>
            {singleLink.icon}
          </Link>
        ))}
      </div>

      <p>
        © {presentYear}{' '}
        <span>
          <Link
            className={styles.nameLink}
            to={FOOTER_LINKS[0].url}
            target='_blank'
          >
            Jethala Gada.{' '}
          </Link>
        </span>
        All rights reserved
      </p>
    </section>
  );
};

export default Footer;
