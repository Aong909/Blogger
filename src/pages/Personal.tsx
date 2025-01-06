import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import {
  Blog_id,
  Content,
  Follow,
  UpdateUserProfile,
  UserProfile,
} from "../types";
import {
  getBookmarkByID,
  getContentByUserID,
  getFavoriteByID,
  getFollowingByID,
  getUser,
} from "../services";
import CategoryList from "../components/CategoryList/CategoryList";
import ContentList from "../components/ContentList/ContentList";
import Search from "../components/Search/Search";
import { USER } from "../constants";
import { CalcDate } from "../util";

import PopupUpdateUser from "../components/PopupUpdateUser/PopupUpdateUser";

const Personal = () => {
  const { id } = useParams();
  const [contents, setContents] = useState<Content[]>([]);
  const [filterContents, setFilterContents] = useState<Content[]>([]);
  const [user, setUser] = useState<UserProfile>({
    user_id: 99999999,
    user_name: "",
    first_name: "",
    last_name: "",
    created_at: "",
    email: "",
    following: "",
    follower: "",
  });
  const [updateInfo, setUpdateInfo] = useState<UpdateUserProfile>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isFollow, setIsFollow] = useState(false);

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
      setIsFollow(follows.some((fol) => fol.following_id == Number(id)));
    }
  };

  useEffect(() => {
    initData();
  }, [id]);

  const updateDataUser = () => {
    setUser((prev) => ({
      ...prev,
      user_name: updateInfo.userName,
      first_name: updateInfo.firstName,
      last_name: updateInfo.lastName,
      email: updateInfo.email,
    }));
  };

  const onFollow = () => {
    setIsFollow(true);
  };
  const onUnfollow = () => {
    setIsFollow(true);
  };

  const UpdateInfoData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field) {
      setUpdateInfo({
        ...updateInfo,
        [field]: e.target.value,
      });
    }
  };

  return (
    <Box display={"flex"} maxWidth={"1180px"} pt={1}>
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
              <PopupUpdateUser
                user={user}
                updateInfo={updateInfo}
                isFollow={isFollow}
                onFollow={onFollow}
                onUnfollow={onUnfollow}
                UpdateInfoData={UpdateInfoData}
                updateDataUser={updateDataUser}
              />
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
                <Typography>Joined in {CalcDate(user?.created_at)}</Typography>
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
