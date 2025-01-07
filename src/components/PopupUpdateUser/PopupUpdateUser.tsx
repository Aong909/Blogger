import {
  Box,
  Typography,
  Drawer,
  Stack,
  FormHelperText,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

import { SETTING } from "../../constants";
import { saveUnFollow, saveFollow, updateUser } from "../../services";
import FollowButton from "../ButtonFollow/FollowButton";
import FollowingButton from "../ButtonFollow/FollowingButton";
import { UpdateUserProfile, UserProfile } from "../../types";

type Props = {
  user: UserProfile;
  updateDataUser: () => void;
  updateInfo: UpdateUserProfile;
  isFollow: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
  UpdateInfoData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => void;
};

const PopupUpdateUser = ({
  user,
  updateDataUser,
  updateInfo,
  isFollow,
  onFollow,
  onUnfollow,
  UpdateInfoData,
}: Props) => {
  const data = JSON.parse(localStorage.getItem("user") || "");

  if (user.user_id == data.user_id) {
    const [isOpenSetup, setIsOpenSetup] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrMsg("");
      try {
        const response = await updateUser(
          user?.user_id,
          updateInfo.userName,
          updateInfo.firstName,
          updateInfo.lastName,
          updateInfo.email
        );
        if (response === "Update success") {
          updateDataUser();
          onClose();
        }
      } catch (error) {
        console.error("Error:", error);
        if (axios.isAxiosError(error)) {
          setErrMsg(error.response?.data.message);
        }
      }
    };

    const onClose = () => {
      setIsOpenSetup(false);
    };
    const onOpen = () => {
      setIsOpenSetup(true);
    };

    return (
      <>
        <Box
          display={"flex"}
          justifyContent={"center"}
          px={"12px"}
          py={"4px"}
          borderRadius={"20px"}
          border={1}
          borderColor={"#fcfcfc"}
          gap={"4px"}
          sx={{ cursor: "pointer" }}
          onClick={onOpen}
        >
          {SETTING.icon}
          <Typography>Set up personal information</Typography>
        </Box>
        <Drawer open={isOpenSetup} onClose={onClose}>
          <Box
            position={"fixed"}
            top={"50%"}
            left={"50%"}
            width={"500px"}
            borderRadius={"20px"}
            bgcolor={"#fcfcfc"}
            color={"#1F4529"}
            p={2}
            pb={5}
            sx={{ transform: "translate(-50%,-50%)" }}
          >
            <Stack sx={{ cursor: "pointer" }} onClick={onClose}>
              ✖
            </Stack>
            <Stack>
              <Typography
                fontSize={"18px"}
                fontWeight={600}
                textAlign={"center"}
                pb={2}
              >
                Update personal information
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <FormHelperText
                      error={errMsg === "Username is duplicate"}
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100px",
                      }}
                    >
                      User Name
                    </FormHelperText>
                    <TextField
                      size="small"
                      variant="filled"
                      value={updateInfo?.userName}
                      onChange={(e) => UpdateInfoData(e, "userName")}
                      fullWidth
                      required
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          sx: {
                            height: "38px",
                            textAlign: "center",
                            paddingBottom: "16px",
                            bgcolor: "transparent",
                            border: `${
                              errMsg === "Username is duplicate"
                                ? "1px solid red"
                                : "1px solid #3c335257"
                            }`,
                            "&:focus-within": {
                              border: `${
                                errMsg === "Username is duplicate"
                                  ? "2px solid red"
                                  : "2px solid #3c335257"
                              }`,
                              bgcolor: "transparent",
                            },
                            ":hover": {
                              border: "1px solid #3C3352",
                              bgcolor: "transparent",
                            },
                          },
                        },
                      }}
                      helperText={
                        errMsg === "Username is duplicate" ? (
                          <Typography fontSize={"12px"} color="red">
                            {errMsg}
                          </Typography>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <FormHelperText
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100px",
                      }}
                    >
                      First Name
                    </FormHelperText>
                    <TextField
                      size="small"
                      variant="filled"
                      value={updateInfo?.firstName}
                      onChange={(e) => UpdateInfoData(e, "firstName")}
                      fullWidth
                      required
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          sx: {
                            height: "38px",
                            textAlign: "center",
                            paddingBottom: "16px",
                            bgcolor: "transparent",
                            border: "1px solid #3c335257",
                            "&:focus-within": {
                              border: "2px solid #3C3352",
                              bgcolor: "transparent",
                            },
                            ":hover": {
                              border: "1px solid #3C3352",
                              bgcolor: "transparent",
                            },
                          },
                        },
                      }}
                    />
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <FormHelperText
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100px",
                      }}
                    >
                      Last Name
                    </FormHelperText>
                    <TextField
                      size="small"
                      variant="filled"
                      value={updateInfo?.lastName}
                      onChange={(e) => UpdateInfoData(e, "lastName")}
                      fullWidth
                      required
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          sx: {
                            height: "38px",
                            textAlign: "center",
                            paddingBottom: "16px",
                            bgcolor: "transparent",
                            border: "1px solid #3c335257",
                            "&:focus-within": {
                              border: "2px solid #3C3352",
                              bgcolor: "transparent",
                            },
                            ":hover": {
                              border: "1px solid #3C3352",
                              bgcolor: "transparent",
                            },
                          },
                        },
                      }}
                    />
                  </Stack>
                  {/* <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <FormHelperText
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        width: "100px",
                      }}
                      error={errMsg === "Email is duplicate"}
                    >
                      Email
                    </FormHelperText>
                    <TextField
                      type="email"
                      size="small"
                      variant="filled"
                      value={updateInfo?.email}
                      onChange={(e) => UpdateInfoData(e, "email")}
                      fullWidth
                      required
                      slotProps={{
                        input: {
                          disableUnderline: true,
                          sx: {
                            height: "38px",
                            textAlign: "center",
                            paddingBottom: "16px",
                            bgcolor: "transparent",
                            border: `${
                              errMsg === "Email is duplicate"
                                ? "1px solid red"
                                : "1px solid #3c335257"
                            }`,
                            "&:focus-within": {
                              border: `${
                                errMsg === "Email is duplicate"
                                  ? "2px solid red"
                                  : "2px solid #3c335257"
                              }`,
                              bgcolor: "transparent",
                            },
                            ":hover": {
                              border: "1px solid #3C3352",
                              bgcolor: "transparent",
                            },
                          },
                        },
                      }}
                      helperText={
                        errMsg === "Email is duplicate" ? (
                          <Typography fontSize={"12px"} color="red">
                            {errMsg}
                          </Typography>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Stack> */}
                  <Stack pt={2}>
                    <Button
                      type="submit"
                      sx={{
                        borderRadius: "20px",
                        border: "1px solid #1F4529",
                        color: "#1F4529",
                        fontWeight: 600,
                      }}
                    >
                      Update
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Stack>
          </Box>
        </Drawer>
      </>
    );
  } else {
    const handleClickFollow = (fol: boolean) => {
      if (fol) {
        onUnfollow;
        saveUnFollow(data.user_id, user.user_id);
      } else {
        onFollow;
        saveFollow(data.user_id, user.user_id);
      }
    };
    return (
      <Box>
        {isFollow ? (
          <FollowingButton follow={isFollow} handleClick={handleClickFollow} />
        ) : (
          <FollowButton follow={isFollow} handleClick={handleClickFollow} />
        )}
      </Box>
    );
  }
};

export default PopupUpdateUser;
