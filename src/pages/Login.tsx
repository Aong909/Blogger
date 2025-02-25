import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

import FormLogin from "../components/Form/FormLogin";
import FromRegister from "../components/Form/FromRegister";
import { flatMap } from "lodash";

type Props = {
  setUser: () => void;
};

const Login = ({ setUser }: Props) => {
  const [isRegister, setIsRegister] = useState(false);

  // return (
  //   <Box
  //     position={"absolute"}
  //     left={"50%"}
  //     top={"50%"}
  //     maxWidth={"500px"}
  //     width={"70%"}
  //     // height={"750px"}
  //     p={4}
  //     sx={{
  //       transform: "translate(-50%,-50%)",
  //       boxSizing: "border-box",
  //     }}
  //   >
  //     <Stack display={"flex"} direction={"row"} justifyContent={"space-around"}>
  //       <Button
  //         fullWidth
  //         sx={
  //           isLogin
  //             ? {
  //                 color: "#3C3352",
  //                 bgcolor: "#72BF78",
  //                 fontSize: "16px",
  //                 fontWeight: 600,
  //               }
  //             : {
  //                 color: "#d3ee98",
  //                 bgcolor: "#7cc983",
  //                 fontSize: "16px",
  //                 fontWeight: 600,
  //               }
  //         }
  //         onClick={() => setIsLogin(true)}
  //       >
  //         Login
  //       </Button>
  //       <Button
  //         fullWidth
  //         sx={
  //           !isLogin
  //             ? {
  //                 color: "#3C3352",
  //                 bgcolor: "#72BF78",
  //                 fontSize: "16px",
  //                 fontWeight: 600,
  //               }
  //             : {
  //                 color: "#d3ee98",
  //                 bgcolor: "#7cc983",
  //                 fontSize: "16px",
  //                 fontWeight: 600,
  //               }
  //         }
  //         onClick={() => setIsLogin(false)}
  //       >
  //         Register
  //       </Button>
  //     </Stack>
  //     <Box bgcolor={"#A0D683"} p={2}>
  //       {isLogin ? (
  //         <FormLogin setUser={setUser} />
  //       ) : (
  //         <FromRegister setToggle={setIsLogin} />
  //       )}
  //     </Box>
  //   </Box>
  // );
  return (
    <Box
      display={"flex"}
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        width={"920px"}
        height={"680px"}
        borderRadius={"20px"}
        overflow={"hidden"}
        position={"relative"}
        sx={{ boxShadow: "12" }}
      >
        <Box className={isRegister ? "form active" : "form"} display={"flex"}>
          <Stack className={"form-login"} gap={"20px"}>
            <FormLogin setUser={setUser} />
            <Box display={{ xs: "inline", sm: "none" }}>
              <Typography>Don,t have an account?</Typography>
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setIsRegister(true)}
              >
                register now
              </Typography>
            </Box>
          </Stack>
          <Stack className={"form-register"} gap={"20px"}>
            <Typography>Please signup to continue</Typography>
            <FromRegister setToggle={setIsRegister} />
            <Box display={{ xs: "inline", sm: "none" }}>
              <Typography>Already have an account?</Typography>
              <Typography
                onClick={() => setIsRegister(false)}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                login now
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Stack display={{ xs: "none", sm: "flex" }}>
          <Box
            className={"description"}
            left={0}
            bgcolor={"#1F4529"}
            color={"#ffffff"}
            width={"40%"}
          >
            <Typography fontSize={"36px"} fontWeight={700}>
              SSBlogger
            </Typography>

            <Typography>Already have an account?</Typography>
            <Button
              onClick={() => setIsRegister(false)}
              sx={{
                color: "#ffffff",
                border: "2px solid #ffffff",
                borderRadius: "20px",
                padding: "8px 20px",
              }}
            >
              Login
            </Button>
          </Box>
          <Box
            className={"description"}
            right={0}
            bgcolor={"#ffffff"}
            color={"#1F4529"}
            width={"60%"}
          >
            <Typography fontSize={"36px"} fontWeight={700}>
              Welcome to SSBlogger
            </Typography>

            <Typography>Don,t have an account?</Typography>
            <Button
              onClick={() => setIsRegister(true)}
              sx={{
                color: "#1F4529",
                border: "2px solid #1F4529",
                borderRadius: "20px",
                padding: "8px 20px",
              }}
            >
              Register
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
