"use client";

import { CartProductType, SelectedImgType } from "./ProductDetails";
import styles from "./SetColor.module.scss";

interface SetSizeProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleSizeSelect: (value: string) => void;
}

const SetSize: React.FC<SetSizeProps> = ({
  images,
  cartProduct,
  handleSizeSelect,
}) => {
  return (
    <div className={styles["btn-group"]}>
      {["XS", "S", "M", "L", "XL"].map((size, index) => (
        <button
          onClick={() => {
            handleSizeSelect(size);
          }}
          className={`${
            size === cartProduct.selectedImg.size ? styles["active-black"] : ""
          } ${styles["btn-hover"]} ${styles["btn-default-hover"]} ${
            styles["fw-semibold"]
          } ${styles["mt-2"]} ${styles["mr-1"]}`}
          key={index}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SetSize;
