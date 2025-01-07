import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { userLogin } from "../../services";

type Props = {
  setUser: () => void;
};

const FormLogin = ({ setUser }: Props) => {
  const [login, setLogin] = useState({
    userName: "",
    userPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const errors = {
    user: "User not found",
    password: "Oops,wrong password",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setErrorMsg("");
      const response = await userLogin(login.userName, login.userPassword);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.message);
      }
    }
  };

  return (
    <Box>
      {errorMsg && (
        <Box pb={2}>
          <Typography color="#F13636">{errorMsg}</Typography>
        </Box>
      )}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl
          sx={{
            paddingBottom: "20px",
            input: {
              color: "#ffffff",
            },
            //default border color
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${errorMsg == errors.user ? "#F13636" : "#ebebeb"}`,
              bgcolor: `${
                errorMsg == errors.user ? "#ff000010" : "transparent"
              }`,
              "& .Mui-focused": {
                borderColor: "#ffffff",
              },
            },
            //focus border color
            "& .Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            },
            //hover border and label color
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#dddddd",
              },
              "& .MuiInputLabel-outlined": {
                color: "#dddddd",
              },
            },
            //label
            "& .MuiInputLabel-outlined": {
              color: `${errorMsg == errors.user ? "#F13636" : "#ebebeb"}`,
              //focus label
              "&.Mui-focused": {
                color: "#ffffff",
                fontWeight: "bold",
              },
            },
          }}
        >
          <TextField
            label={"Username"}
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => {
              setLogin({ ...login, userName: e.target.value });
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            paddingBottom: "20px",
            input: {
              color: "#ffffff",
            },
            //default border color
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${
                errorMsg == errors.password ? "#F13636" : "#ebebeb"
              }`,
              bgcolor: `${
                errorMsg == errors.password ? "#ff000010" : "transparent"
              }`,
              color: "#ffffff",
              "& .Mui-focused": {
                borderColor: "#ffffff",
              },
            },
            //focus border color
            "& .Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
            },
            //hover border and label color
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#dddddd",
              },
              "& .MuiInputLabel-outlined": {
                color: "#dddddd",
              },
            },
            //label
            "& .MuiInputLabel-outlined": {
              color: `${errorMsg == errors.password ? "#F13636" : "#ebebeb"}`,
              //focus label
              "&.Mui-focused": {
                color: "#ffffff",
                fontWeight: "bold",
              },
            },
          }}
        >
          <TextField
            label={"Password"}
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => {
              setLogin({ ...login, userPassword: e.target.value });
            }}
          />
        </FormControl>
        <Stack>
          <Button
            type="submit"
            disabled={login.userName === "" || login.userPassword === ""}
            sx={{
              borderRadius: "20px",
              border: "2px solid #ffffff",
              color: "#ffffff",
              ":disabled": {
                border: "2px solid #bebebe",
                color: "#bebebe",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormLogin;
