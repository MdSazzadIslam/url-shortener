import React from "react";

type InputType = "text";

interface TextBoxProps {
  type: InputType;
  placeholder: string;
  disabled: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  className: string;
  ref: React.MutableRefObject<HTMLInputElement | null>;
  onFocus: () => void;
}

const TextBox = ({
  type,
  placeholder,
  disabled,
  name,
  onChange,
  required,
  className,
  ref,
  onFocus,
}: TextBoxProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      onChange={(e) => onChange(e)}
      required={required}
      className={className}
      ref={ref}
      onFocus={onFocus}
    />
  );
};

TextBox.defaultProps = {
  type: "text",
};

export default TextBox;
