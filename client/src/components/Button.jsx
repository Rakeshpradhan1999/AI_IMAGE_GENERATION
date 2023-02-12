import React from "react";

const Button = ({ fullwidth, disable, children, ...props }) => {
  const classes = `${fullwidth && " block w-full"} ${
    disable ? "bg-gray-400  pointer-events-none " : "bg-primary"
  } p-2  text-white text-sm rounded-md px-4`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
