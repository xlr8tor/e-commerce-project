"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import { formatPrice } from "@/helpers/formatPrice";
import { formatNumber } from "@/helpers/formatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: { label: string; digit: number };
};
const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sales: {
      label: "Total Sales",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSales = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      tempData.sales.digit = totalSales;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);
  return (
    <div className={styles.summary}>
      <div className={`${styles["mb-4"]} ${styles["mt-8"]}`}>
        <h3>Stats</h3>
      </div>
      <div className={`${styles["grid"]}`}>
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div key={key} className={styles["key"]}>
                <div className={`${styles["fw-bold"]}`}>
                  {summaryData[key].label === "Total Sales" ? (
                    <>{formatPrice(summaryData[key].digit / 100)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
