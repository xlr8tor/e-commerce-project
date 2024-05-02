import CheckoutClient from "./CheckoutClient";
import Container from "@/components/Container";
import styles from "./Checkout.module.scss";
import { Suspense } from "react";
import Loading from "../loading";

const Checkout = () => {
  return (
    <div className={`${styles["wrapper"]}`}>
      <div className={styles["card-form"]}>
        <Suspense fallback={<Loading />}>
          <CheckoutClient />
        </Suspense>
      </div>
    </div>
  );
};

export default Checkout;
