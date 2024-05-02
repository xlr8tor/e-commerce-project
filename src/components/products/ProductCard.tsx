"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import card from "./ProductCard.module.scss";
import { Rating } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { formatPrice } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";
import { CartProductType } from "./ProductDetails";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const [cartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.name,
    description: data.description,
    category: data.category,
    brand: data.brand,
    quantity: 1,
    price: data.price,
    selectedImg: { ...data.images[0] },
  });
  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === data.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, data.id]);

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;
  const router = useRouter();
  return (
    <article
      className={card["discover-grid__item"]}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/shop/${data.id}`);
      }}
    >
      <div className={card["overflow-control"]}>
        <Image
          src={`${data.images[0].image}`}
          alt="White Band Smart Watch"
          className={card["discover-grid__item--img"]}
          fill
        />
      </div>
      <div className={card["discover-grid__item--content"]}>
        <h3 className={card["discover-grid__item--title"]}>{data.name}</h3>
        <div className={card["rating__wrap"]}>
          <Rating
            style={{ width: "100%", color: "#FDCC0D" }}
            value={productRating}
            readOnly
            icon={<StarRoundedIcon />}
            emptyIcon={<StarOutlineRoundedIcon />}
          />
          <p>({data.reviews.length})</p>
        </div>
        <div className={card["discover-grid__prices"]}>
          <div className={card["price-group"]}>
            <p className={`${card["price"]} ${card["fw-semibold"]}`}>
              {formatPrice(data.price)}
            </p>
          </div>

          <button
            className={`${card["btn-hover"]} ${card["fw-semibold"]}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddProductToCart(cartProduct);
            }}
            disabled={isProductInCart}
            style={{ cursor: isProductInCart ? "not-allowed" : "pointer" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
