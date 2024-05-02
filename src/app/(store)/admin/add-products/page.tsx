import Container from "@/components/Container";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/NullData";
import styles from "../Admin.module.scss";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div>
      <Container>
        <div
          className={`${styles["pt-8"]}`}
          style={{
            maxWidth: "600px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <AddProductForm />
        </div>
      </Container>
    </div>
  );
};

export default AddProducts;
