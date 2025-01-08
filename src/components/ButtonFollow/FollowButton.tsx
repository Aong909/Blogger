import { Box, Typography } from "@mui/material";
import { Follow } from "../../types";

type Props = {
  follow: Follow | boolean;
  handleClick: (Follow: Follow | any) => void;
  color?: string;
};

const FollowButton = ({ follow, handleClick, color }: Props) => {
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
      sx={{
        cursor: "pointer",
        ":hover": {
          bgcolor: "#72bf78cc",
          border: "2px solid #1F4529",
        },
      }}
    >
      <Typography>Follow</Typography>
    </Box>
  );
};

export default FollowButton;
