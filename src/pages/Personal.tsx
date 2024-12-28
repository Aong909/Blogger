import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Blog_id, Content, Follow, UserProfile } from "../types";
import {
  getBookmarkByID,
  getContentByUserID,
  getFavoriteByID,
  getFollowingByID,
  getUser,
  saveFollow,
  saveUnFollow,
  updateUser,
} from "../api";
import CategoryList from "../components/CategoryList/CategoryList";
import ContentList from "../components/ContentList/ContentList";
import Navbar from "../components/Navbar/Navbar";
import Search from "../components/Search/Search";
import { SETTING, USER } from "../constants";
import { CalcDate } from "../util";
import FollowingButton from "../components/ButtonFollow/FollowingButton";
import FollowButton from "../components/ButtonFollow/FollowButton";

const Personal = () => {
  const { id } = useParams();
  const [contents, setContents] = useState<Content[]>([]);
  const [filterContents, setFilterContents] = useState<Content[]>([]);
  const [user, setUser] = useState<UserProfile>({
    user_id: 99999999,
    user_name: "",
    first_name: "",
    last_name: "",
    create_at: "",
    email: "",
    following: "",
    follower: "",
  });
  const [updateInfo, setUpdateInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [openSetup, setOpenSetup] = useState(false);
  const [follow, setFollow] = useState(false);

  const initData = async () => {
    const localUser = JSON.parse(localStorage.getItem("user") || "");
    //check user name from URL path
    if (id) {
      const userData: UserProfile = await getUser(id);
      const allContent: Content[] = await getContentByUserID(id);
      const bookmarkByID: Blog_id[] = await getBookmarkByID(id);
      const favoriteByID: Blog_id[] = await getFavoriteByID(id);
      const follows: Follow[] = await getFollowingByID(localUser.user_id);
      //mapping content favorite and bookmark
      const contentMapping = allContent.map((content) => {
        return {
          ...content,
          favorite: favoriteByID.some((fav) => fav.blog_id === content.blog_id),
          bookmark: bookmarkByID.some(
            (book) => book.blog_id === content.blog_id
          ),
        };
      });
      //set content if have user_name from URL
      setContents(contentMapping);
      setFilterContents(contentMapping);
      //set User
      setUser(userData);
      setUpdateInfo({
        userName: userData.user_name,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
      });
      // set follower
      setFollow(follows.some((fol) => fol.following_id == Number(id)));
    }
  };

  useEffect(() => {
    initData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateUser(
        user?.user_id,
        updateInfo.userName,
        updateInfo.firstName,
        updateInfo.lastName,
        updateInfo.email
      );
      if (response === "Update success") {
        setUser((prev) => ({
          ...prev,
          user_name: updateInfo.userName,
          first_name: updateInfo.firstName,
          last_name: updateInfo.lastName,
          email: updateInfo.email,
        }));
        setOpenSetup(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const PopupUpdateUser = () => {
    const data = JSON.parse(localStorage.getItem("user") || "");

    if (user.user_id == data.user_id) {
      return (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            px={"12px"}
            py={"4px"}
            borderRadius={"20px"}
            border={1}
            borderColor={"#3C3352"}
            gap={"4px"}
            sx={{ cursor: "pointer" }}
            onClick={() => setOpenSetup(true)}
          >
            {SETTING.icon}
            <Typography>Set up personal information</Typography>
          </Box>
          <Drawer open={openSetup} onClose={() => setOpenSetup(false)}>
            <Box
              position={"fixed"}
              top={"50%"}
              left={"50%"}
              width={"500px"}
              borderRadius={"20px"}
              bgcolor={"#D3EE98"}
              p={2}
              pb={5}
              sx={{ transform: "translate(-50%,-50%)" }}
            >
              <Stack
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenSetup(false)}
              >
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
                        onChange={(e) =>
                          setUpdateInfo({
                            ...updateInfo,
                            userName: e.target.value,
                          })
                        }
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
                        First Name
                      </FormHelperText>
                      <TextField
                        size="small"
                        variant="filled"
                        value={updateInfo?.firstName}
                        onChange={(e) =>
                          setUpdateInfo({
                            ...updateInfo,
                            firstName: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setUpdateInfo({
                            ...updateInfo,
                            lastName: e.target.value,
                          })
                        }
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
                        Email
                      </FormHelperText>
                      <TextField
                        type="email"
                        size="small"
                        variant="filled"
                        value={updateInfo?.email}
                        onChange={(e) =>
                          setUpdateInfo({
                            ...updateInfo,
                            email: e.target.value,
                          })
                        }
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
                    <Stack pt={2}>
                      <Button
                        type="submit"
                        sx={{
                          bgcolor: "#72BF78",
                          color: "#3C3352",
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
          setFollow(false);
          saveUnFollow(data.user_id, user.user_id);
        } else {
          setFollow(true);
          saveFollow(data.user_id, user.user_id);
        }
      };
      return (
        <Box>
          {follow ? (
            <FollowingButton follow={follow} handleClick={handleClickFollow} />
          ) : (
            <FollowButton follow={follow} handleClick={handleClickFollow} />
          )}
        </Box>
      );
    }
  };

  return (
    <Box display={"flex"} maxWidth={"1180px"} pt={1} mr={"auto"} ml={"auto"}>
      <Navbar />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flex={3}
        height={"99vh"}
      >
        <Box
          display={"flex"}
          minWidth={"520px"}
          flex={1}
          flexDirection={"column"}
          gap={2}
          sx={{
            overflowX: "hidden",
            overflowY: "inherit",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            bgcolor={"#72BF78"}
            p={"10px"}
            borderRadius={"20px"}
            gap={2}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              color={"#3C3352"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"100%"}
                border={1}
                borderColor={"#3C3352"}
                width={"80px"}
                height={"80px"}
                bgcolor={"#72BF78"}
              >
                {USER.largeIcon}
              </Box>
              {PopupUpdateUser()}
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              color={"#3C3352"}
            >
              <Stack>
                <Typography fontWeight={600} fontSize={"20px"}>
                  {user?.user_name}
                </Typography>
                <Typography>
                  {user?.first_name} {user?.last_name}
                </Typography>
              </Stack>
              <Stack>
                <Typography>Joined in {CalcDate(user?.create_at)}</Typography>
                <Stack direction={"row"} gap={1}>
                  <Typography fontWeight={600}>{user?.following}</Typography>
                  <Typography>Following</Typography>
                  <Typography fontWeight={600}>{user?.follower}</Typography>
                  <Typography>Follower</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <ContentList
            contents={filterContents}
            setContent={setContents}
            setFilterContent={setFilterContents}
          />
        </Box>
        <Box
          display={{ xs: "none", md: "flex" }}
          height={"99vh"}
          flexDirection={"column"}
          pl={"20px"}
          pr={"10px"}
          gap={"20px"}
          width={"280px"}
          sx={{
            overflowX: "hidden",
            overflowY: "inherit",
          }}
        >
          <Search contents={contents} setContent={setFilterContents} />
          <CategoryList contents={contents} setContent={setFilterContents} />
        </Box>
      </Box>
    </Box>
  );
};

export default Personal;
