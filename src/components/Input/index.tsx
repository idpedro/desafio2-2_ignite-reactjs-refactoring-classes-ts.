import { useField } from "@unform/core";
import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons/lib";
import { Container } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  Icon?: IconType;
}

function Input({ name, Icon, ...rest }: InputProps) {
  const { fieldName, defaultValue, registerField } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
}

export default Input;
