import getProductById from "@/actions/getProductById";
import NullData from "@/components/NullData";
import ProductDetails from "@/components/products/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;

  return <div>{<ProductDetails product={product} user={user} />}</div>;
};

export default Product;
