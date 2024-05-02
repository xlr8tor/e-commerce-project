"use client";
import { SafeUser } from "@/types/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import styles from "./ProductDetails.module.scss";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No rating selected");
    }
    const ratingData = { ...data, userId: user?.id, product: product };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  const deliveredOrder = user.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product.reviews.find((review: Review) => {
    return review.userId === user.id;
  });

  if (!deliveredOrder || userReview) return null;

  return (
    <div className={styles["add-rating"]}>
      <h3>Rate this product</h3>
      <Rating
        style={{ width: "fit-content", color: "#FDCC0D" }}
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="comment"
        required
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className={`${styles["btn-default"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["active"]}`}
      >
        {isLoading ? "Loading..." : "Rate Product"}
      </button>
    </div>
  );
};

export default AddRating;
