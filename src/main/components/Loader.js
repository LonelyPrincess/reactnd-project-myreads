import React from 'react';

import '../../res/styles/Loader.css';

/**
 * Stateless component to render a loading message that can be used whenever an
 * AJAX request is being performed, to let the user know something's going on
 * while the browser receives a response from the external server.
 *
 * @module components/Loader
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
function Loader () {
  return (
    <div className="loader-container">
      <div className="loader-body">
        <span className="loader-letter-l">L</span>
        <span className="loader-letter-o">o</span>
        <span className="loader-letter-a">a</span>
        <span className="loader-letter-d">d</span>
        <span className="loader-letter-i">i</span>
        <span className="loader-letter-n">n</span>
        <span className="loader-letter-g">g</span>
      </div>
    </div>
  );
}

export default Loader;