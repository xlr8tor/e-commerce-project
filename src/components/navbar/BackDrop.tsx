interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100vw",
        height: "100vh",
        opacity: 5,
        position: "fixed",
        zIndex: "20",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};

export default BackDrop;
