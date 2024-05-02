"use client";

import { ImageType } from "@/app/(store)/admin/add-products/AddProductForm";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Input.module.scss";

interface SelectImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({
  item,
  handleFileChange,
}) => {
  const onDrop = useCallback((acceptFiles: File[]) => {
    if (acceptFiles.length > 0) {
      handleFileChange(acceptFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });
  return (
    <div {...getRootProps()} className={styles["select-image"]}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here</p> : <p>+ {item?.color} Image</p>}
    </div>
  );
};

export default SelectImage;
