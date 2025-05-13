import React from 'react';
import './button.css';

interface ButtonProps {
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ disabled }) => {
  return (
    <button type="submit" disabled={disabled}>
      Generate My Ticket
    </button>
  );
};

export default Button;
