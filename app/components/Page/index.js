import React, { PropTypes } from 'react';

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
    </div>
  );
}

Page.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default Page;
