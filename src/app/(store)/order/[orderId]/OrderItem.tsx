"use client";

import { CartProductType } from "@prisma/client";
import Image from "next/image";
import styles from "./Order.module.scss";
import { formatPrice } from "@/helpers/formatPrice";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className={styles["order-item"]}>
      <div className={styles["order-item__wrap"]}>
        <div className={styles["order-item-img__wrap"]}>
          <Image
            src={`/img/shop/${item.selectedImg.image}`}
            alt={item.name}
            fill
            className={styles["img"]}
          />
        </div>
        <div className={styles["order-item-txt__wrap"]}>
          <div>{item.name}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className={`${styles["center"]}`}>{formatPrice(item.price)}</div>
      <div className={`${styles["center"]}`}>{item.quantity}</div>
      <div className={`${styles["end"]} ${styles["fw-semibold"]}`}>
        ${(item.quantity * item.price).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
