import React from "react";

const TextField = ({
  value,
  fullWidth = true,
  onChange,
  type = "text",
  placeholder,
  label,
  name,
  surpriseMeBtn,
  surpriseMeHandle = () => {},
}) => {
  return (
    <div>
      <div>
        {label && <label>{label}</label>}
        {surpriseMeBtn && (
          <button
            className="text-primary text-xs px-2 py-1 bg-gray-100 inline-block ml-2 font-semibold rounded-md"
            onClick={surpriseMeHandle}
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        className={`${
          fullWidth && "w-full"
        }  shadow  border rounded-md p-2 bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-0 text-sm mt-2`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
