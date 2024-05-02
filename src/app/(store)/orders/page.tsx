import Container from "@/components/Container";
import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/NullData";
import OrdersClient from "./OrderClient";
import getOrderByUserId from "@/actions/getOrderByUserId";
import styles from "../page.module.scss";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  const orders = await getOrderByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="No orders yet" />;
  }
  return (
    <div className={styles["wrapper"]}>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
