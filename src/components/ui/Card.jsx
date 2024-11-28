import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white shadow-sm rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
