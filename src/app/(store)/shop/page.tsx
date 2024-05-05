//export const dynamic = "force-dynamic";

import ProductCard from "@/components/products/ProductCard";
import shop from "./page.module.scss";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "@/components/NullData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Page",
  description: "Shop",
};

interface ShopPageProps {
  searchParams: IProductParams;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await getProducts(searchParams);

  if (!products) {
    return <NullData title="Oops! No product found" />;
  }

  return (
    <section className={shop.wrapper}>
      <div className={shop.discover}>
        <section className={shop["discover-grid"]}>
          {products.map((product: any, index: number) => (
            <ProductCard key={index} data={product} />
          ))}
        </section>
      </div>
    </section>
  );
}
