import { Link } from 'react-router-dom';
import { footerLinks } from '../../constants/constants';
import styles from './Footer.module.css';

const Footer = () => {
  const presentYear = new Date().getFullYear();
  return (
    <section className={styles.footer}>
      <div className={styles.linksContainer}>
        {footerLinks.map((singleLink) => (
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
            to={footerLinks[0].url}
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
