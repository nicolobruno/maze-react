import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Square.css';

function Square({ enabled, active }) {
  return (
    <div className={`${classNames('square',{[`enabled`]: !enabled}, {[`active`]: active})}`} />
  );
}

Square.propTypes = {
  enabled: PropTypes.bool,
  active: PropTypes.bool
};

export default Square;
