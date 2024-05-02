"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.scss";

interface TextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
  style?: React.CSSProperties;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  disabled,
  required,
  register,
  errors,
  className,
  style,
}) => {
  return (
    <div
      // className={`${styles["form-control"]} ${className && styles[className]}`}
      className={`${styles["form-control"]} ${styles["mt-1"]} ${
        errors[id] ? styles.error : null
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <textarea
        style={style}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`${styles["input-field"]} ${styles["text-area"]} ${
          styles["mt-1"]
        } ${errors[id] ? styles.error : null}`}
      />
    </div>
  );
};

export default TextArea;
