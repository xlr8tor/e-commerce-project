import Container from "@/components/Container";
import React from "react";
import ManageProductClient from "./ManageProductClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div>
      <Container>
        <ManageProductClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
