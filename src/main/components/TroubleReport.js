import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless component to render a customized error message. If no props are
 * specified, a default message will be shown.
 *
 * @module components/TroubleReport
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */
function TroubleReport (props) {
  return (
    <section className="container error-message">
      <h1>{props.title || 'Houston, we have a problem!'}</h1>
      <p>{props.message || 'Unknown evil forces did something bad here...'}</p>
      <div className="crying-face"></div>
    </section>
  );
}

TroubleReport.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default TroubleReport;