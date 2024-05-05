"use client";

import { formatPrice } from "@/helpers/formatPrice";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import styles from "./Order.module.scss";
import Status from "@/components/Status";
import moment from "moment";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className={styles["details"]}>
      <div className={styles["mt-8"]}>
        <h3>Order Details</h3>
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount:{" "}
        <span className={styles["fw-bold"]}>{formatPrice(order.amount)}</span>
      </div>
      <div className={styles["payment"]}>
        <div>Payment Status: </div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={AccessTimeIcon}
              bg="#99F6E4"
              color="#0F766E"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={DoneIcon}
              bg="#99F6E4"
              color="#0F766E"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles["payment"]}>
        <div>Delivery Status: </div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={AccessTimeIcon}
              bg="#99F6E4"
              color="#0F766E"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={DeliveryDiningIcon}
              bg="#99F6E4"
              color="#0F766E"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={DoneIcon}
              bg="#99F6E4"
              color="#0F766E"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdDate).fromNow()}</div>
      <div>
        <h2
          className={`${styles["fw-semibold"]} ${styles["mt-4"]} ${styles["mb-2"]}`}
        >
          Products ordered
        </h2>
        <div className={`${styles["grid"]}`}>
          <div className={`${styles["col-span"]} ${styles["start"]}`}>
            PRODUCT
          </div>
          <div className={`${styles["center"]}`}>PRICE</div>
          <div className={`${styles["center"]}`}>QTY</div>
          <div className={`${styles["end"]}`}>TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
