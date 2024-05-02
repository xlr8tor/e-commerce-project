import AdminNav from "@/components/admin/AdminNav";
import styles from "./Admin.module.scss";

export const metadata = {
  title: "Dziram Admin",
  description: "Dziram Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["wrapper"]}>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
