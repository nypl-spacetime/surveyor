import React, { PropTypes } from 'react';

import Button from 'components/Button';
import Buttons from 'components/Buttons';

import styles from './styles.css';

function Page(props) {
  return (
    <article>
      <div>
        {props.children}
      </div>
    </article>
  );
}

Page.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.any,
};

export default Page;
