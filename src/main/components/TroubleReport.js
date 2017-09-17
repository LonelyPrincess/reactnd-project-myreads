import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless component to render a customized error message. If no props are
 * specified, a default message will be shown.
 *
 * @module components/TroubleReport
 * @author LonelyPrincess <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {string} [props.title] - Error title.
 * @param {string} [props.message] - Detailed error message.
 */
function TroubleReport (props) {
  return (
    <section className="container" data-page="trouble-report">
      <h2>{props.title || 'Houston, we have a problem!'}</h2>
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