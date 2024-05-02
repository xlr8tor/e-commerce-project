"use client";
import { ImageType } from "@/app/(store)/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import styles from "./Input.module.scss";
import SelectImage from "./SelectImage";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);
  return (
    <div className={styles["grid"]}>
      <div className={styles["flex"]}>
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          style={{ cursor: "pointer" }}
        />
        <label
          htmlFor={item.color}
          className={styles["fw-medium"]}
          style={{ cursor: "pointer" }}
        >
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className={styles["col-span-2"]}>
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className={styles["display-image"]}>
            <p className={`${styles["font-sm"]}`}>{file?.name}</p>
            <div className={styles["width"]}>
              <button
                className={`${styles["font-sm"]}`}
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
