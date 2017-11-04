import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Stateless component to render the application's header. This will determine
 * whether each of the buttons will be displayed or not depending on the path
 * received as a prop.
 *
 * @module components/Header
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 */
function Header (props) {

  const { currentPath } = props;

  const headerClass = (currentPath === '/'
    ? 'without-back-button'
    : (currentPath === '/about'
      ? 'without-info-button'
      : null));

  return (
    <header className={headerClass}>
      {currentPath !== '/' && (<Link className="ico back-button" to="/"></Link>)}
      <h1>MyReads</h1>
      {currentPath !== '/about' && (<Link className="ico info-button" to="/about"></Link>)}
    </header>
  );
}

Header.propTypes = {
  currentPath: PropTypes.string.isRequired
};

export default Header;