import { Box, Popover, Typography } from "@mui/material";

import { User } from "../../types";
import { useCookies } from "react-cookie";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
  user: User;
};

const LogoutPopup = ({ open, onClose, anchorEl, user }: Props) => {
  const [, , removeCookie] = useCookies(["token"]);

  const handleClick = () => {
    removeCookie("token");
    localStorage.removeItem("user");
    console.log("logout");
  };
  return (
    <>
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              bgcolor: "#d3ee98",
              border: "1px solid #b398ee",
            },
          },
        }}
      >
        <Box
          width={"200px"}
          py={"10px"}
          px={"20px"}
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <Typography>Logout</Typography>
          <Typography>{user.user_name}</Typography>
        </Box>
      </Popover>
    </>
  );
};

export default LogoutPopup;
