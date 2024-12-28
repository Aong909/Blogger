import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";

import FormLogin from "../components/Form/FormLogin";
import FromRegister from "../components/Form/FromRegister";

type Props = {
  setUser: () => void;
};

const Login = ({ setUser }: Props) => {
  const [toggle, setToggle] = useState(true);

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      top={"50%"}
      maxWidth={"500px"}
      width={"70%"}
      // height={"750px"}
      p={4}
      sx={{
        transform: "translate(-50%,-50%)",
        boxSizing: "border-box",
      }}
    >
      <Stack display={"flex"} direction={"row"} justifyContent={"space-around"}>
        <Button
          fullWidth
          sx={
            toggle
              ? {
                  color: "#3C3352",
                  bgcolor: "#72BF78",
                  fontSize: "16px",
                  fontWeight: 600,
                }
              : {
                  color: "#d3ee98",
                  bgcolor: "#7cc983",
                  fontSize: "16px",
                  fontWeight: 600,
                }
          }
          onClick={() => setToggle(true)}
        >
          Login
        </Button>
        <Button
          fullWidth
          sx={
            !toggle
              ? {
                  color: "#3C3352",
                  bgcolor: "#72BF78",
                  fontSize: "16px",
                  fontWeight: 600,
                }
              : {
                  color: "#d3ee98",
                  bgcolor: "#7cc983",
                  fontSize: "16px",
                  fontWeight: 600,
                }
          }
          onClick={() => setToggle(false)}
        >
          Register
        </Button>
      </Stack>
      <Box bgcolor={"#A0D683"} p={2}>
        {toggle ? (
          <FormLogin setUser={setUser} />
        ) : (
          <FromRegister setToggle={setToggle} />
        )}
      </Box>
    </Box>
  );
};

export default Login;
