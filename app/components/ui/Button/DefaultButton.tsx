"use client";

import { useState, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  textColor?: string;
  children: ReactNode;
  disabled?: boolean;
}

const Button = ({ 
  backgroundColor = '#0d6efd',
  textColor = '#ffffff',
  children,
  disabled = false,
  ...props 
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => { 
    // ... existing code ...
  };

  const buttonStyle = {
    backgroundColor: disabled ? '#cccccc' : backgroundColor,
    color: disabled ? '#666666' : textColor,
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? '처리중...' : children}
    </button>
  );
};

export default Button;