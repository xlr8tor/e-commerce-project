import styles from "./NullData.module.scss";

interface NullDataProps {
  title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className={styles.data}>
      <p className={styles["font-semibold"]}>{title}</p>
    </div>
  );
};

export default NullData;
