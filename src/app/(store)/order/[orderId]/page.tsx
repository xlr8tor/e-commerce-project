import getOrderById from "@/actions/getOrderById";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import OrderDetails from "./OrderDetails";
import styles from "./Order.module.scss";

interface IParams {
  orderId?: string;
}
const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params);

  if (!order) {
    return <NullData title="No order" />;
  }
  return (
    <div className={styles["wrapper"]}>
      <Container>{<OrderDetails order={order} />}</Container>
    </div>
  );
};

export default Order;
