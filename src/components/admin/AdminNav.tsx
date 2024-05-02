"use client";

import Link from "next/link";
import Container from "../Container";
import styles from "./AdminNav.module.scss";
import AdminNavItem from "./AdminNavItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DnsIcon from "@mui/icons-material/Dns";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathName = usePathname();

  return (
    <div className={`${styles["pt-4"]} ${styles["nav"]}`}>
      <Container>
        <div className={styles["flex"]}>
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={DashboardIcon}
              selected={pathName === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={LibraryAddIcon}
              selected={pathName === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={DnsIcon}
              selected={pathName === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={FormatListBulletedIcon}
              selected={pathName === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
