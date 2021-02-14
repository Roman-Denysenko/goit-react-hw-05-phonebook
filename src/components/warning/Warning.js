import React from 'react';
import PropTypes from 'prop-types'; 

import s from './Warning.module.css';


const Warning = ({ name }) => {
    return (
        <div className={s.warningContainer}>
            <p>{ `${name} is already is contact`}</p>
        </div>
    )
}

Warning.propTypes = {
  name: PropTypes.string,
};

export default Warning;