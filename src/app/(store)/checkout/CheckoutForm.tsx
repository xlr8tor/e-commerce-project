import { formatPrice } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./Checkout.module.scss";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Successful");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div>
        <h1 className={`${styles["mb-6"]}`}>
          Enter your payment details to checkout
        </h1>
      </div>
      <h2
        className={`${styles["font-semibold"]} ${styles["font-sm"]} ${styles["mt-4"]} ${styles["mb-2"]}`}
      >
        Address Information
      </h2>
      <AddressElement
        id="payment-element"
        options={{
          mode: "shipping",
          allowedCountries: ["US", "GB"],
        }}
      />
      <h2
        className={`${styles["font-semibold"]} ${styles["font-sm"]} ${styles["mt-4"]} ${styles["mb-2"]}`}
      >
        Payment Information
      </h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div
        className={`${styles["font-semibold"]} ${styles["font-xl"]} ${styles["pt-4"]} ${styles["pb-4"]}`}
      >
        Total: {formattedPrice}
      </div>
      <button
        disabled={isLoading || !stripe || !elements}
        className={`${styles["btn-default"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["active"]} ${styles["flex"]}`}
      >
        {isLoading ? "Processing" : "Pay now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
