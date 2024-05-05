"use client";

import { CartProductType, SelectedImgType } from "./ProductDetails";
import styles from "./SetColor.module.scss";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: string) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className={styles["btn-group"]}>
      {["Black", "Cream", "Green", "Blue", "Red", "White"].map(
        (color, index) => (
          <button
            onClick={() => {
              handleColorSelect(color);
            }}
            className={`${
              color === cartProduct.selectedImg.color
                ? styles["active-black"]
                : ""
            } ${styles["btn-hover"]} ${styles["btn-default-hover"]} ${
              styles["fw-semibold"]
            } ${styles["mt-2"]} ${styles["mr-1"]}`}
            key={index}
          >
            {color}
          </button>
        )
      )}
    </div>
  );
};

export default SetColor;
