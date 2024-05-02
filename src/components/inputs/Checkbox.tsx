"use client";

import { Input } from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        style={{ cursor: "pointer" }}
      />
      <label htmlFor={id} style={{ cursor: "pointer", fontSize: "14px" }}>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
