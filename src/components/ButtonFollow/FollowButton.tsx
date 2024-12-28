import { Box, Typography } from "@mui/material";
import { Follow } from "../../types";

type Props = {
  follow: Follow | boolean;
  handleClick: (Follow: Follow | any) => void;
};

const FollowButton = ({ follow, handleClick }: Props) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      px={2}
      py={0.5}
      borderRadius={"20px"}
      bgcolor={"#72BF78"}
      border={1}
      borderColor={"#3c3352"}
      onClick={() => handleClick(follow)}
      sx={{
        cursor: "pointer",
        ":hover": {
          bgcolor: "#72bf78cc",
          color: "#fcfcfc",
          borderColor: "#fcfcfc",
        },
      }}
    >
      <Typography>Follow</Typography>
    </Box>
  );
};

export default FollowButton;
