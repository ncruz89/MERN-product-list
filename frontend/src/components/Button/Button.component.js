import React from "react";

import "./Button.styles.css";

const Button = ({ type, children, ...otherProps }) => {
  return (
    <button className="button" type={type} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
