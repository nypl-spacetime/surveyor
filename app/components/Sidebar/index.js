import React from 'react';

import styles from './styles.css';

function Sidebar(props) {
  return (
    <div className={`${styles.container}`}>
      {props.children}
    </div>
  );
}

export default Sidebar;
