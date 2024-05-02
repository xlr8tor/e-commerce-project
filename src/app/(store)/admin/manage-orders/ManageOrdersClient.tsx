"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import { formatPrice } from "@/helpers/formatPrice";
import styles from "../manage-products/ManageProduct.module.scss";
import Status from "@/components/Status";
import ActionBtn from "@/components/ActionBtn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
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
      field: "customer",
      headerName: "Customer Name",
      width: 130,
    },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return <div className={styles["fw-semibold"]}>{params.row.amount}</div>;
      },
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={styles["flex"]}>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={AccessTimeIcon}
                bg="#E2E8F0"
                color="#334155"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="completed"
                icon={DoneIcon}
                bg="#BBF7D0"
                color="#15803D"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={styles["flex"]}>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={AccessTimeIcon}
                bg="#E2E8F0"
                color="#334155"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                icon={DeliveryDiningIcon}
                bg="#E9D5FF"
                color="#7E22CE"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="delivered"
                icon={DoneIcon}
                bg="#BBF7D0"
                color="#15803D"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
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
              onClick={() => handleDispatch(params.row.id)}
              icon={DeliveryDiningIcon}
            />
            <ActionBtn
              onClick={() => {
                handleDeliver(params.row.id);
              }}
              icon={DoneIcon}
            />
            <ActionBtn
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
              icon={RemoveRedEyeIcon}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id: id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Order dispatched");
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Oops! Something went wrong");
        console.log(error);
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id: id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Order delivered");
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
        <h3>Manage Orders</h3>
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

export default ManageOrdersClient;
