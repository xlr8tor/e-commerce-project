"use client";

import CustomCheckbox from "@/components/inputs/Checkbox";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "./AddProduct.module.scss";
import { categories } from "@/helpers/categories";
import CategoryInput from "@/components/inputs/CategoryInput";
import { colors } from "@/helpers/colors";
import SelectColor from "@/components/inputs/SelectColor";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
  });
  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let upLoadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image");
    }

    const handleImageUpload = async () => {
      toast("Creating product, please wait....");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      upLoadedImages.push({ ...item, image: downloadURL });
                      console.log("File available at: ", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                      console.log("Error getting downloadable URL");
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image upload", error);
        return toast.error("Error handling image upload");
      }
    };

    await handleImageUpload();
    const productData = { ...data, images: upLoadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong while saving product");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);
  return (
    <>
      <h3>Add Product</h3>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Name"
        style={{ padding: "1rem" }}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Price"
        type="number"
        style={{ padding: "1rem" }}
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Brand"
        style={{ padding: "1rem" }}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Description"
        style={{ padding: "1rem" }}
        required
      />
      <CustomCheckbox
        id="inStock"
        label="This product is in stock"
        register={register}
      />
      <div
        className={`${styles["w-full"]} ${styles["fw-medium"]} ${styles["mb-2"]}`}
      >
        <div className={`${styles["mb-2"]} ${styles["fw-semibold"]}`}>
          Select a Category
        </div>
        <div className={styles["grid"]}>
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label}>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          <div className={` ${styles["fw-semibold"]}`}>
            Select the available product sizes and upload their image
          </div>
          <p className={`${styles["font-sm"]}`}>
            You must upload an image for each product
          </p>
        </div>
        <div className={styles["grid-2"]}>
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        className={`${styles["btn-default"]} ${styles["btn-default-hover"]} ${styles["fw-semibold"]} ${styles["w-full"]} ${styles["active"]} `}
      >
        {isLoading ? "Loading..." : "Add Product"}
      </button>
    </>
  );
};

export default AddProductForm;
