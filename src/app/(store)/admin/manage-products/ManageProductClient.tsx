"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { formatPrice } from "@/helpers/formatPrice";
import styles from "./ManageProduct.module.scss";
import Status from "@/components/Status";
import ActionBtn from "@/components/ActionBtn";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductClientProps {
  products: Product[];
}
const ManageProductClient: React.FC<ManageProductClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return <div /**bold slate800 */>{params.row.price}</div>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "inStock",
      headerName: "inStock",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={styles["flex"]}>
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={DoneIcon}
                bg="#99F6E4"
                color="#0F766E"
              />
            ) : (
              <Status
                text="Out of stock"
                icon={CloseIcon}
                bg="#FECDD3"
                color="#BE123C"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <ActionBtn
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
              icon={CachedIcon}
            />
            <ActionBtn
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
              icon={DeleteIcon}
            />
            <ActionBtn
              onClick={() => {
                router.push(`/shop/${params.row.id}`);
              }}
              icon={RemoveRedEyeIcon}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id: id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Oops! Something went wrong");
        console.log(error);
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting product, please wait...");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("Image deleted", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting image error", error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Oops! Something went wrong");
        console.log(error);
      });
  }, []);
  return (
    <div className={`${styles["font-xl"]}`}>
      <div className={`${styles["mb-4"]} ${styles["mt-8"]}`}>
        <h3>Manage Products</h3>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductClient;
