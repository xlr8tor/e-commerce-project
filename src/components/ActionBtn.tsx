import { SvgIconComponent } from "@mui/icons-material";

interface ActionBtnProps {
  icon: SvgIconComponent;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: `${disabled ? "not-allowed" : "pointer"}`,
        width: "40px",
        height: "30px",
        border: "1px solid #94a3b8",
        borderRadius: "0.25rem",
        opacity: `${disabled && "0.5"}`,
      }}
    >
      <Icon />
    </button>
  );
};

export default ActionBtn;
