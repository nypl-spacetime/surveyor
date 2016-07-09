/**
 *
 * Buttons.react.js
 *
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';

function Buttons(props) {
  return (
    <div className={styles.buttons}>
      {props.children}
    </div>
  );
}

Buttons.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Buttons;
