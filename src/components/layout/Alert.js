import React from 'react';

// this is functional component
// emmit shortcut: rcef
export const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i>
        <label> </label>
        {alert.msg}
      </div>
    )
  );
};
export default Alert;
