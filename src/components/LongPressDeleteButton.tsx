import { useState, useEffect, FC } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type LongPressDeleteButtonProps = {
  onLongPress: () => void;
};

const LongPressDeleteButton: FC<LongPressDeleteButtonProps> = ({ onLongPress }) => {
  const [pressTimer, setPressTimer] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const handleMouseDown = () => {
    setIsPressing(true);
    setPressTimer(
      setTimeout(() => {
        onLongPress();
      }, 700)
    );
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
    setIsPressing(false);
  };

  const handleMouseLeave = () => {
    clearTimeout(pressTimer);
    setIsPressing(false);
  };

  useEffect(() => {
    return () => clearTimeout(pressTimer);
  }, [pressTimer]);

  return (
    <IconButton
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      color={isPressing ? "error" : "secondary"}
      style={{ transition: "all 0.7s" }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default LongPressDeleteButton;
