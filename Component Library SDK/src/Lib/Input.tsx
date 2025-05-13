// Input.tsx
import React from "react";

interface InputData {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputData> = ({ label, placeholder, name, value, onChange }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type='text' placeholder={placeholder} value={value} onChange={onChange} required/>
    </>
  );
};

export default Input;
