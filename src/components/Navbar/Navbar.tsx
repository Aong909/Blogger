import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { LOGO, NAVBAR_ITEM, USER } from "../../constants";
import { useEffect, useState } from "react";
import { User } from "../../types";
import LogoutPopup from "../Logout/LogoutPopup";

type Props = {
  setLocalUser: () => void;
};

const Navbar = ({ setLocalUser }: Props) => {
  const [user, setUser] = useState<User>({
    user_id: 999999,
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    user_role: "",
    created_at: "",
  });

  const location = useLocation();
  //get data user from local storage
  const getUserLocalStorage = () => {
    try {
      const data = JSON.parse(localStorage.getItem("user") || "");
      return data;
    } catch (error) {
      return null;
    }
  };

  const isNavbarItem = (id: string) => {
    const lastIndex = location.pathname.length;
    const pathname = location.pathname.slice(1, lastIndex);

    if (pathname == id) {
      return true;
    } else if (id == "home" && !pathname) {
      return true;
    } else if (id == "personal" && pathname == `personal/${user.user_id}`) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setUser(getUserLocalStorage);
  }, [location]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <Box
      display={{ xs: "none", sm: "flex" }}
      flexDirection={"column"}
      height={"98vh"}
      // width={{ sm: "fit-content", md: "260px" }}
      minWidth={"60px"}
      pt={1}
      alignSelf={"center"}
    >
      <Stack mb={2} px={"10px"} alignItems={{ xs: "center", lg: "flex-start" }}>
        <Link to={"/"}>{LOGO.icon}</Link>
      </Stack>
      <Stack spacing={2} alignItems={{ xs: "flex-end", lg: "flex-start" }}>
        {NAVBAR_ITEM.map((item) => (
          <Link
            to={
              item.id === "personal"
                ? `/${item.id}/${user.user_id}`
                : `/${item.id}`
            }
            key={item.id}
          >
            <Button
              sx={{
                color: "#1F4529",
                borderRadius: "30px",
                // paddingRight: "20px",
              }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                {isNavbarItem(item.id) ? item.iconOutlined : item.icon}
                <Typography
                  display={{ xs: "none", lg: "flex" }}
                  fontSize={"18px"}
                  fontWeight={700}
                >
                  {item.label}
                </Typography>
              </Stack>
            </Button>
          </Link>
        ))}
      </Stack>
      <Stack flex={1} alignItems={"flex-start"} justifyContent={"flex-end"}>
        <Button
          sx={{
            width: "100%",
            color: "#1F4529",
            borderRadius: "30px",
            textTransform: "none",
          }}
          onClick={handleClickUser}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={{ xs: "flex-end", lg: "space-between" }}
            width={"100%"}
          >
            <Stack direction={"row"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",
                  border: "1px solid #1F4529",
                  width: "50px",
                  height: "50px",
                }}
              >
                {USER.icon}
              </Box>
              <Stack
                px={"8px"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                display={{ xs: "none", lg: "flex" }}
              >
                <Typography fontSize={"14px"} fontWeight={600}>
                  {user?.user_name}
                </Typography>
                <Typography
                  fontSize={"12px"}
                >{`${user?.first_name} ${user?.last_name}`}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Button>
      </Stack>
      <LogoutPopup
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        user={user}
        setLocalUser={setLocalUser}
      />
    </Box>
  );
};

export default Navbar;
