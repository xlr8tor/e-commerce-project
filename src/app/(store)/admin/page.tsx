import getProducts from "@/actions/getProducts";
import styles from "./Admin.module.scss";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "@/components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  return (
    <div>
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className={`${styles["bar"]}`}>
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
