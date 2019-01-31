import React from 'react';
import PropTypes from 'prop-types';

const HelloWorld = ({ msg }) => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-blue text-5xl">{msg}</h1>
  </div>
);

HelloWorld.defaultProps = {
  msg: 'Hello World!'
};

HelloWorld.propTypes = {
  msg: PropTypes.string
};

export default HelloWorld;
