import { Box, Typography } from "@mui/material";
import { Follow } from "../../types";
import { useState } from "react";

type Props = {
  follow: Follow | boolean;
  handleClick: (Follow: Follow | any) => void;
};

const FollowingButton = ({ follow, handleClick }: Props) => {
  const [hoverText, setHoverText] = useState("Following");
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      px={2}
      py={0.5}
      borderRadius={"20px"}
      border={"1px solid #000000"}
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
