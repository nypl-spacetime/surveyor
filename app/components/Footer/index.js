import React from 'react';

// import Article from 'components/Article';

import nypl from 'images/nypl.svg';

import styles from './styles.css';

function Footer(props) {
  return (
    <footer className={`${styles.footer} ${props.className}`}>
      <nav>
        <div className={`${styles.container} ${styles['nav-container']}`}>
          <a href='http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy' target='_blank'>Privacy Policy</a>
          <a href='http://www.nypl.org/help/about-nypl/legal-notices/rules-and-regulations' target='_blank'>Rules and Regulations</a>
          <a href='http://www.nypl.org/policy-patron-generated-web-content' target='_blank'>Policy on Patron-Generated Web Content</a>
          <a href='http://www.nypl.org/help/about-nypl/legal-notices/website-terms-and-conditions' target='_blank'>Terms and Conditions</a>
        </div>
      </nav>
      <div className={styles.container}>
        <p>
          A <a href='http://spacetime.nypl.org/'>NYC Space/Time Directory</a> project
        </p>
        <p>
          © The New York Public Library, Astor, Lenox, and Tilden Foundation 2013-2016
        </p>
        <p>
          <img src={nypl} />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
