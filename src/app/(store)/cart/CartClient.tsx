"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./CartClient.module.scss";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/helpers/formatPrice";
import { SafeUser } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length == 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles["empty-cart"]}>
          <h3
            className={`${styles["cart-title"]} ${styles["font-2xl"]} ${styles["fw-semibold"]}`}
          >
            Your cart is empty
          </h3>
          <Image
            src="/img/pink-cart.png"
            alt="pink cart"
            width={300}
            height={300}
          />
          <p
            className={`${styles["text"]} ${styles["pb-4"]} ${styles["pb-2"]} `}
          >
            Your cart is longing for some company. Begin your shopping adventure
            now!
          </p>
          <div>
            <Link
              className={`${styles["btn-default"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["active"]} ${styles["flex"]}`}
              href={"/"}
            >
              <ArrowBackIcon />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <h3
        className={`${styles["cart-title"]} ${styles["font-2xl"]} ${styles["fw-semibold"]}`}
      >
        Shopping Cart
      </h3>
      <div
        className={`${styles["cart-grid"]} ${styles["pb-2"]} ${styles["font-sm"]} ${styles["mt-8"]}`}
      >
        <div>PRODUCT</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className={`${styles["cart-bottom"]} ${styles["pt-4"]}`}>
        <div>
          <button
            className={`${styles["clear"]}`}
            onClick={() => handleClearCart()}
          >
            Clear Cart
          </button>
        </div>
        <div
          className={`${styles["font-sm"]} ${styles["cart-bottom__content"]}`}
        >
          <div
            className={`${styles["row-1"]} ${styles["fw-semibold"]} ${styles["font-md"]}`}
          >
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p>Taxes and shipping calculate at checkout</p>
          <button
            className={`${styles["btn-default"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["active"]}`}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/signin");
            }}
          >
            {currentUser ? "Checkout" : "Login to Checkout"}
          </button>
          <Link href={"/"} className={`${styles["link"]} ${styles["mt-2"]}`}>
            <ArrowBackIcon fontSize="small" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
