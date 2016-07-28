import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

import nypl from 'images/nypl-white.svg';

function Header(props) {
  return (
    <header className={`${props.className} ${styles.header} ${styles['align-center']}`}>
      <div className={`${styles['align-center']} ${styles.main}`}>
        <a style={{backgroundImage: `url(${nypl})`}} className={`${styles.logo}`} href='//nypl.org' target='_blank'>
        </a>
        <a href='http://spacetime.nypl.org/' target='_blank'>
          <div className={styles.subtitles}>
            <h2>
              The New York Public Library
            </h2>
            <h3>
              NYC Space/Time Directory
            </h3>
          </div>
        </a>
        <h1 className={styles.title}>
          <Link to='/'>
            {props.title}
          </Link>
        </h1>
      </div>
      <div>
        {props.children}
      </div>
    </header>
  );
}

export default Header;
