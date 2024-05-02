import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        height={30}
        width={30}
        style={{ borderRadius: "100%" }}
      />
    );
  }
  return <AccountCircleIcon />;
};

export default Avatar;
