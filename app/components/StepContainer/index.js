import React, { PropTypes } from 'react';

import styles from './styles.css';

function StepContainer(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

StepContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StepContainer;
