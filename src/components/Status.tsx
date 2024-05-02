import { SvgIconComponent } from "@mui/icons-material";
import styles from "./Status.module.scss";

interface StatusProps {
  text: string;
  icon: SvgIconComponent;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className={styles["status"]} style={{ background: bg, color: color }}>
      {text} <Icon fontSize="small" />
    </div>
  );
};

export default Status;
