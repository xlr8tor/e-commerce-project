"use client";
import Image from "next/image";
import styles from "./ProductDetails.module.scss";
import { Rating } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { formatPrice } from "@/helpers/formatPrice";
import { useCallback, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SetColor from "./SetColor";
import SetSize from "./SetSize";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import SetQuantity from "./SetQuantity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListRating from "./ListRating";
import AddRating from "./AddRating";
import { User } from "@prisma/client";
import { log } from "console";

interface ProductDetailsProps {
  product: any;
  user: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  selectedImg: SelectedImgType;
};

export type SelectedImgType = {
  size: string;
  color: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, user }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const productRating =
    (product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
      product.reviews.length) |
    0;

  console.log(productRating);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    quantity: 1,
    price: product.price,
    selectedImg: { ...product.images[0] },
  });

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
    setIsLoading(false);
  }, [cartProducts, product.id]);

  const handleColorSelect = useCallback((value: string) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: { ...prev.selectedImg, color: value } };
    });
  }, []);

  const handleSizeSelect = useCallback((value: string) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: { ...prev.selectedImg, size: value } };
    });
  }, []);

  const increment = () => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  };

  const decrement = () => {
    setCartProduct((prev) => {
      if (prev.quantity > 1) {
        return { ...prev, quantity: prev.quantity - 1 };
      }
      return prev;
    });
  };
  const handleChange = (value: number) => {
    setCartProduct((prev) => {
      return { ...prev, quantity: value };
    });
  };

  return (
    <section className={styles.container}>
      <section className={styles.wrapper}>
        <section className={styles["product-details"]}>
          <div className={styles["product-details-main"]}>
            <div className={styles["col1"]}>
              <div className={styles["overflow-control"]}>
                <Image
                  src={`${cartProduct.selectedImg.image}`}
                  alt="White Band Smart Watch"
                  className={styles["product-details-img"]}
                  fill
                  priority
                />
              </div>
              <div className={styles["comment"]}>
                <AddRating product={product} user={user} />
                <ListRating product={product} />
              </div>
            </div>
            <div className={styles["col2"]}>
              <div className={styles["pill"]}>
                <p
                  className={`${styles["pill-text"]} ${styles["fw-semibold"]}`}
                >
                  {product.category}
                </p>
              </div>
              <h2 className={`${styles["title"]} ${styles["fw-medium"]}`}>
                {product.name}
              </h2>
              <div className={styles["rating__wrap"]}>
                <Rating
                  style={{ width: "initial", color: "#FDCC0D" }}
                  value={productRating}
                  readOnly={true}
                  icon={<StarRoundedIcon />}
                  emptyIcon={<StarOutlineRoundedIcon />}
                />

                <p>({productRating})</p>
                <p className={`${styles["reviews"]} ${styles["fw-semibold"]}`}>
                  {product.reviews.length} reviews
                </p>
                <p>1919 Sold</p>
              </div>
              <h3 className={`${styles["price"]} ${styles["fw-medium"]}`}>
                {formatPrice(product.price)}
              </h3>
              {isProductInCart ? (
                <>
                  <p className={styles["added"]}>
                    <CheckCircleIcon color="success" />
                    <span>Product added to cart</span>
                  </p>
                </>
              ) : (
                <>
                  {!isLoading && (
                    <>
                      <div className={styles["select-section"]}>
                        <p className={styles["select-color"]}>Select Color</p>
                        <SetColor
                          images={product.images}
                          cartProduct={cartProduct}
                          handleColorSelect={handleColorSelect}
                        />
                      </div>
                      <div className={styles["select-section"]}>
                        <p className={styles["select-size"]}>Select Size</p>
                        <SetSize
                          images={product.images}
                          cartProduct={cartProduct}
                          handleSizeSelect={handleSizeSelect}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <div className={styles["description"]}>
                <p className={styles["description-title"]}>Description</p>
                <p className={styles["description-body"]}>
                  {product.description}...
                  <a href="" className={styles["hover-underline-animation"]}>
                    Read More
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={styles["product-details-aside"]}>
            <div className={styles["product-details-aside__head"]}>
              <h3 className={styles["title"]}>Order Summary</h3>
            </div>

            <div className={styles["product-details-aside__body"]}>
              <div className={styles["quantity-control"]}>
                <p
                  className={`${styles["quantity-text"]} ${styles["fw-semibold"]}`}
                >
                  Quantity
                </p>
                <SetQuantity
                  cartProduct={cartProduct}
                  handleQtyIncrease={increment}
                  handleQtyDecrease={decrement}
                  handleQtyChange={(value: number) => {
                    handleChange(value);
                  }}
                />
              </div>
              <div className={styles["product-details-aside__item"]}>
                <p className={styles["col1"]}>Color</p>
                <p className={`${styles["col2"]} ${styles["fw-semibold"]}`}>
                  {cartProduct.selectedImg.color}
                </p>
              </div>
              <div className={styles["product-details-aside__item"]}>
                <p className={styles["col1"]}>Size</p>
                <p className={`${styles["col2"]} ${styles["fw-semibold"]}`}>
                  {cartProduct.selectedImg.size}
                </p>
              </div>
              <div className={styles["product-details-aside__item"]}>
                <p className={styles["col1"]}>Price</p>
                <p className={`${styles["col2"]} ${styles["fw-semibold"]}`}>
                  {formatPrice(cartProduct.price)}
                </p>
              </div>
              <div className={styles["product-details-aside__item"]}>
                <p className={styles["col1"]}>Discount</p>
                <p className={`${styles["col2"]} ${styles["fw-semibold"]}`}>
                  10% (51.29)
                </p>
              </div>
              <div className={styles["product-details-aside__item"]}>
                <p className={styles["col1"]}>Delivery</p>
                <p className={`${styles["col2"]} ${styles["fw-semibold"]}`}>
                  $3.99
                </p>
              </div>
              <div className={`${styles["form-control"]} ${styles["mt-4"]}`}>
                <label htmlFor="notes" className={styles["fw-semibold"]}>
                  Notes
                </label>
                <textarea
                  className={styles["mt-1"]}
                  name="notes"
                  id="notes"
                  placeholder="Write a note..."
                ></textarea>
              </div>
              <div className={styles["coupon"]}>
                <p
                  className={`${styles["apply-coupon"]} ${styles["fw-semibold"]}`}
                >
                  Apply Coupon
                </p>
                <Image
                  src="/img/icons/ticket.svg"
                  alt="Coupon"
                  height={20}
                  width={22.5}
                />
              </div>
            </div>
            <div className={styles["total-wrap"]}>
              <p className={`${styles["sub-total"]} ${styles["fw-semibold"]}`}>
                Sub Total
              </p>
              <p className={`${styles["price"]} ${styles["fw-semibold"]}`}>
                $126.99
              </p>
            </div>
            <div className={styles["btn-group"]}>
              <button
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                  router.push("/checkout");
                }}
                className={`${styles["btn-default"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["active"]}`}
              >
                Buy Now
              </button>
              {isProductInCart ? (
                <button
                  className={`${styles["btn-hover"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["padded"]}`}
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  <ShoppingCartIcon />
                  View Cart
                </button>
              ) : (
                <button
                  className={`${styles["btn-hover"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["padded"]}`}
                  onClick={() => handleAddProductToCart(cartProduct)}
                >
                  <ShoppingCartIcon />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ProductDetails;
