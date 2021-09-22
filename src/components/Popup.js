import React from 'react';

const Popup = ({ color, msg }) => {
  return <div className={`popup-container-${color}`}>{msg}</div>;
};

export default Popup;
