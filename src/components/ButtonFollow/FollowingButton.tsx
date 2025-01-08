import { Box, Typography } from "@mui/material";
import { Follow } from "../../types";
import { useState } from "react";

type Props = {
  follow: Follow | boolean;
  handleClick: (Follow: Follow | any) => void;
  color?: string;
};

const FollowingButton = ({ follow, handleClick, color }: Props) => {
  const [hoverText, setHoverText] = useState("Following");
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      px={2}
      py={0.5}
      borderRadius={"20px"}
      border={1}
      borderColor={color ? color : "#1F4529"}
      color={color ? color : "#1F4529"}
      onClick={() => handleClick(follow)}
      onMouseOver={() => setHoverText("Unfollow")}
      onMouseOut={() => setHoverText("Following")}
      sx={{
        cursor: "pointer",
        ":hover": {
          color: "#ff7070",
          borderColor: "#ff7070",
        },
      }}
    >
      <Typography>{hoverText}</Typography>
    </Box>
  );
};

export default FollowingButton;
