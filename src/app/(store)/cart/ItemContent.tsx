"use client";
import { CartProductType } from "@/components/products/ProductDetails";
import styles from "./ItemContent.module.scss";
import { formatPrice } from "@/helpers/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import SetQuantity from "@/components/products/SetQuantity";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleCartQtyChange,
  } = useCart();

  return (
    <div
      className={`${styles["item-content"]} ${styles["pt-4"]} ${styles["pb-4"]}`}
    >
      <div className={styles["cols-1"]}>
        <Link href={`/shop/${item.id}`}>
          <div className={styles["img-wrapper"]}>
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              objectFit="cover"
            />
          </div>
        </Link>
        <div>
          <Link className={styles["fw-semibold"]} href={`/shop/${item.id}`}>
            {item.name}
          </Link>
          <div>{item.selectedImg.color}</div>
          <div>
            <button
              className={styles["delete"]}
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className={styles["fw-semibold"]}>{formatPrice(item.price)}</div>
      <div>
        <SetQuantity
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
          handleQtyChange={(value: number) => {
            handleCartQtyChange(item, value);
          }}
        />
      </div>
      <div className={styles["fw-semibold"]}>
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
