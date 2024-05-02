"use client";

import { SvgIconComponent } from "@mui/icons-material";
import styles from "./Input.module.scss";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: SvgIconComponent;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`${styles["category"]} ${
        selected ? styles["selected"] : styles["not-selected"]
      }`}
    >
      <Icon />
      <div className={styles["fw-medium"]}>{label}</div>
    </div>
  );
};

export default CategoryInput;
