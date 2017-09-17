import React from 'react';

import '../../res/styles/Loader.css';

/**
 * Stateless component to render a loading message that can be used whenever an
 * AJAX request is being performed, to let the user know something's going on
 * while the browser receives a response from the external server.
 *
 * @module components/Loader
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function Loader () {
  const message = 'Loading';

  return (
    <div className="loader-container">
      <div className="loader-body">
        {message.split('').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </div>
  );
}

export default Loader;