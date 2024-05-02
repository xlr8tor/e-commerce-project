"use client";
import moment from "moment";
import styles from "./ProductDetails.module.scss";
import { Rating } from "@mui/material";
import Avatar from "../Avatar";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product.reviews.length === 0) return null;
  return (
    <div>
      <h3 className={`${styles["font-2xl"]}`}>Product Review</h3>
      <div className={`${styles["mt-2"]} ${styles["font-sm"]}`}>
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className={styles["width"]}>
                <div className={styles["flex"]}>
                  <Avatar src={review?.user.image} />
                  <div className={`${styles["fw-semibold"]}`}>
                    {review?.user.name}
                  </div>
                  <div className={`${styles["fw-light"]}`}>
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className={`${styles["mt-2"]}`}>
                  <Rating
                    value={review.rating}
                    readOnly
                    style={{ width: "fit-content", color: "#FDCC0D" }}
                  />
                  <div className={`${styles["ml-2"]}`}>{review.comment}</div>
                  <hr className={`${styles["mt-4"]} ${styles["mb-4"]}`} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
