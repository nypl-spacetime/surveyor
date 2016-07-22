import React, { PropTypes } from 'react';

import Footer from 'components/Footer';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import styles from './styles.css';

function Page(props) {
  return (
    <div className={styles.container}>
      <Buttons>
        <Button onClick={props.buttonAction} type='primary'>Back to Surveyor</Button>
      </Buttons>
      <article className={styles.article}>
        {props.children}
      </article>
      <Buttons>
        <Button onClick={props.buttonAction} type='primary'>Back to Surveyor</Button>
      </Buttons>
      <Footer className={styles.footer}/>
    </div>
  );
}

Page.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default Page;
