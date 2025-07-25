import React, { KeyboardEvent, ChangeEvent } from 'react';

interface InputWithLabelProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  minLength?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  name,
  onKeyDown,
  placeholder,
  value,
  onChange,
  type = 'text',
  maxLength,
  minLength,
}) => {
  return (
    <input
      type={type}
      className={`outline-none w-full text-sm leading-100 text-grey-light/80 placeholder:text-grey-light/30`}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputWithLabel;