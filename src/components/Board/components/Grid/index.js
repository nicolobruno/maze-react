import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Grid.css';

function Grid({ enabled, active }) {
  return (
    <div className={`${classNames('grid',{[`enabled`]: !enabled}, {[`active`]: active})}`} />
  );
}

Grid.propTypes = {
  enabled: PropTypes.bool,
  active: PropTypes.bool
};

export default Grid;
