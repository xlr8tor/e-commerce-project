"use client";

import { useCart } from "@/hooks/useCart";
import { CartProductType } from "./ProductDetails";
import styles from "./SetQuantity.module.scss";

interface SetQtyProps {
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
  handleQtyChange: (value: number) => void;
}

const SetQuantity: React.FC<SetQtyProps> = ({
  cartProduct,
  handleQtyDecrease,
  handleQtyIncrease,
  handleQtyChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = +e.target.value;
    if (newQuantity < 1 || isNaN(newQuantity)) {
      newQuantity = 1; // If the entered value is less than 1 or NaN, set it to 1
    }
    handleQtyChange(newQuantity);
  };

  return (
    <div>
      <div className={styles["quantity-control"]}>
        <div className={styles["input-number__wrap"]}>
          <div className={styles["number-input"]}>
            <button onClick={handleQtyDecrease} className={styles["minus"]}>
              -
            </button>
            <input
              className={styles["quantity"]}
              min={1}
              max={99}
              name="quantity"
              value={cartProduct.quantity.toString()}
              type="number"
              onChange={handleChange}
            />
            <button onClick={handleQtyIncrease} className={styles["plus"]}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetQuantity;
