/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';

function Button(props) {
  var classNames = [
    styles.button,
    (props.type && styles[props.type]) ? styles[props.type] : '',
    props.disabled ? styles.disabled : ''
  ];

  var onClick;
  if (!props.disabled) {
    onClick = props.onClick
  }

  return (
    <button className={classNames.join(' ')} onClick={onClick}>{props.children}</button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
