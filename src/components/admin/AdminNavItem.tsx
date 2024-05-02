import { SvgIconComponent } from "@mui/icons-material";
import styles from "./AdminNav.module.scss";

interface AdminNavItemProps {
  selected?: boolean;
  icon: SvgIconComponent;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`${styles["nav-item"]} ${
        selected ? styles["selected"] : styles["not-selected"]
      }`}
    >
      <Icon />
      <div
        className={`${styles["font-sm"]} ${styles["fw-semibold"]} ${styles["label"]}`}
      >
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
