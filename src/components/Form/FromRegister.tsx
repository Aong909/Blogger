import { Button, FormControl, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { userRegister } from "../../services";

type Props = {
  setToggle: (value: boolean) => void;
};

const FromRegister = ({ setToggle }: Props) => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    userPassword: "",
  });
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await userRegister(
        register.firstName,
        register.lastName,
        register.email,
        register.userName,
        register.userPassword
      );

      if (response.status == 200) {
        alert("Welcome to Blogger");
        setToggle(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.message.split(" ");
        setErrorMsg(err[0]);
      }
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
      onSubmit={handleSubmit}
    >
      {/* first name */}
      <FormControl
        sx={{
          //default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#69774C"}`,
          },
          //focus border color
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#006F07",
            },
          },
          //hover border and label color
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5E9662",
            },
            "& .MuiInputLabel-outlined": {
              color: "#5E9662",
            },
          },
          //label
          "& .MuiInputLabel-outlined": {
            color: `${"#69774C"}`,
            //focus label
            "&.Mui-focused": {
              color: "#006F07",
              fontWeight: "bold",
            },
          },
        }}
      >
        <TextField
          label={"First name"}
          required
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => {
            setRegister({ ...register, firstName: e.target.value });
          }}
        />
      </FormControl>
      {/* last name */}
      <FormControl
        sx={{
          //default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#69774C"}`,
          },
          //focus border color
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#006F07",
            },
          },
          //hover border and label color
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5E9662",
            },
            "& .MuiInputLabel-outlined": {
              color: "#5E9662",
            },
          },
          //label
          "& .MuiInputLabel-outlined": {
            color: `${"#69774C"}`,
            //focus label
            "&.Mui-focused": {
              color: "#006F07",
              fontWeight: "bold",
            },
          },
        }}
      >
        <TextField
          label={"Last name"}
          required
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => {
            setRegister({ ...register, lastName: e.target.value });
          }}
        />
      </FormControl>
      {/* user name */}
      <FormControl
        sx={{
          //default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#69774C"}`,
          },
          //focus border color
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#006F07",
            },
          },
          //hover border and label color
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5E9662",
            },
            "& .MuiInputLabel-outlined": {
              color: "#5E9662",
            },
          },
          //label
          "& .MuiInputLabel-outlined": {
            color: `${"#69774C"}`,
            //focus label
            "&.Mui-focused": {
              color: "#006F07",
              fontWeight: "bold",
            },
          },
        }}
      >
        <TextField
          label={"Username"}
          error={errorMsg === "Username"}
          helperText={errorMsg === "Username" ? "Username is duplicate" : ""}
          required
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => {
            setRegister({ ...register, userName: e.target.value });
          }}
        />
      </FormControl>
      {/* e-mail */}
      <FormControl
        sx={{
          //default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#69774C"}`,
          },
          //focus border color
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#006F07",
            },
          },
          //hover border and label color
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5E9662",
            },
            "& .MuiInputLabel-outlined": {
              color: "#5E9662",
            },
          },
          //label
          "& .MuiInputLabel-outlined": {
            color: `${"#69774C"}`,
            //focus label
            "&.Mui-focused": {
              color: "#006F07",
              fontWeight: "bold",
            },
          },
        }}
      >
        <TextField
          label={"E-mail"}
          type="email"
          error={errorMsg === "Email"}
          helperText={errorMsg === "Email" ? "Email is duplicate" : ""}
          required
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => {
            setRegister({ ...register, email: e.target.value });
          }}
        />
      </FormControl>
      {/* password */}
      <FormControl
        sx={{
          //default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#69774C"}`,
          },
          //focus border color
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#006F07",
            },
          },
          //hover border and label color
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5E9662",
            },
            "& .MuiInputLabel-outlined": {
              color: "#5E9662",
            },
          },
          //label
          "& .MuiInputLabel-outlined": {
            color: `${"#69774C"}`,
            //focus label
            "&.Mui-focused": {
              color: "#006F07",
              fontWeight: "bold",
            },
          },
        }}
      >
        <TextField
          label={"Password"}
          required
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => {
            setRegister({ ...register, userPassword: e.target.value });
          }}
        />
      </FormControl>
      {/* confirm password */}
      <FormControl
        sx={{
          //default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${"#69774C"}`,
          },
          //focus border color
          "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#006F07",
            },
          },
          //hover border and label color
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#5E9662",
            },
            "& .MuiInputLabel-outlined": {
              color: "#5E9662",
            },
          },
          //label
          "& .MuiInputLabel-outlined": {
            color: `${"#69774C"}`,
            //focus label
            "&.Mui-focused": {
              color: "#006F07",
              fontWeight: "bold",
            },
          },
        }}
      >
        <TextField
          label={"Confirm Password"}
          required
          error={
            register.userPassword !== checkPassword && checkPassword !== ""
          }
          helperText={
            register.userPassword !== checkPassword && checkPassword !== ""
              ? "Password didn't Matching"
              : ""
          }
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => setCheckPassword(e.target.value)}
        />
      </FormControl>
      <Stack>
        <Button
          type="submit"
          disabled={
            register.userPassword !== checkPassword || checkPassword == ""
          }
          sx={{
            borderRadius: "20px",
            bgcolor: "#4eb356",
            color: "#3C3352",
            ":disabled": {
              bgcolor: "#6cc073ff",
              color: "#8d8d8d",
            },
          }}
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default FromRegister;
