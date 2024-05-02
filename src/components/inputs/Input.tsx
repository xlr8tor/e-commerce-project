"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type,
  disabled,
  required,
  register,
  errors,
  className,
  style,
}) => {
  return (
    <div
      className={`${styles["form-control"]} ${styles["mt-1"]} ${
        errors[id] ? styles.error : null
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        style={style}
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        className={`${styles["input-field"]} ${styles["mt-1"]} ${
          errors[id] ? styles.error : null
        }`}
      />
    </div>
  );
};

export default Input;
