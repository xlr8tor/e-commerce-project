"use client";

import { Avatar, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCallback, useState } from "react";
import styles from "./UserMenu.module.scss";
import Link from "next/link";
import BackDrop from "./BackDrop";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className={styles.avatar}>
        <div
          className={`${styles.avatar__wrap} ${styles["btn-border-full"]}`}
          onClick={toggleOpen}
        >
          <AccountCircleIcon sx={{ fontSize: 40, color: "#1c1c1c" }} />
          <ArrowDropDownIcon sx={{ fontSize: 25 }} />
        </div>
        {isOpen && (
          <div className={styles["dropdown"]}>
            <div className={styles["dropdown__wrap"]}>
              <Link href="/orders">
                <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
              </Link>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
