import { Box, Stack, Typography } from "@mui/material";
// import CategoryList from "../components/CategoryList/CategoryList";
import Navbar from "../components/Navbar/Navbar";
import {
  getFollowingByID,
  getTopFollower,
  saveFollow,
  saveUnFollow,
} from "../api";
import { useEffect, useState } from "react";
import { Follow } from "../types";
import { USER } from "../constants";
import TopFollower from "../components/TopFollower/TopFollower";
import FollowingButton from "../components/ButtonFollow/FollowingButton";
import FollowButton from "../components/ButtonFollow/FollowButton";
import { Link } from "react-router-dom";

const Following = () => {
  const [follows, setFollow] = useState<Follow[]>([]);
  const [topFollower, setTopFollower] = useState<Follow[]>([]);

  const initData = async () => {
    const dataUser = localStorage.getItem("user") || "";
    const followData: Follow[] = await getFollowingByID(
      JSON.parse(dataUser || "").user_id
    );
    const topFollowerData: Follow[] = await getTopFollower();
    //mapping followData
    const followerDataMapping = followData.map((item) => {
      return {
        ...item,
        follow: true,
      };
    });

    //mapping topFollowerData
    const topFollowMapping = topFollowerData
      .map((item) => {
        if (
          followData.some(
            (follow) =>
              follow.following_id === item.following_id ||
              follow.user_id === item.following_id
          )
        ) {
          return {
            ...item,
            follow: true,
            user_id: JSON.parse(dataUser || "").user_id,
          };
        } else {
          return {
            ...item,
            follow: false,
            user_id: JSON.parse(dataUser || "").user_id,
          };
        }
      })
      .filter((item) => {
        if (
          !followData.some(
            (follow) =>
              follow.following_id === item.following_id ||
              follow.user_id === item.following_id
          )
        ) {
          return item;
        }
      });

    setFollow(followerDataMapping);
    setTopFollower(topFollowMapping);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleClickFollow = (follow: Follow) => {
    const updateFollow = follows.map((item) => {
      if (item.following_id === follow.following_id) {
        //toggle follow
        if (follow.follow) {
          item.follow = false;
          saveUnFollow(follow.user_id, follow.following_id);
        } else {
          item.follow = true;
          saveFollow(follow.user_id, follow.following_id);
        }
      }
      return item;
    });
    setFollow(updateFollow);
  };

  const handleClickTopFollow = (follow: Follow) => {
    const updateFollow = topFollower.map((item) => {
      if (item.following_id === follow.following_id) {
        //toggle follow
        if (follow.follow) {
          item.follow = false;
          saveUnFollow(follow.user_id, follow.following_id);
        } else {
          item.follow = true;
          saveFollow(follow.user_id, follow.following_id);
        }
      }
      return item;
    });
    setTopFollower(updateFollow);
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
          <Stack gap={1}>
            {follows.map((follow) => (
              <Box
                key={follow.following_id}
                p={"10px"}
                display={"flex"}
                borderRadius={"20px"}
                bgcolor={"#FEFF9F"}
                justifyContent={"space-between"}
                alignItems={"center"}
                color="#3c3352"
              >
                <Link
                  to={{
                    pathname: `/personal/${follow.following_id}`,
                  }}
                  style={{ color: "#3C3352", textDecoration: "none" }}
                >
                  <Box
                    display={"flex"}
                    flex={1}
                    overflow={"hidden"}
                    mr={"4px"}
                    alignItems={"center"}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      width={"50px"}
                      height={"50px"}
                      borderRadius={"100%"}
                      bgcolor={"#72BF78"}
                      color={"#3C3352"}
                    >
                      {USER.icon}
                    </Box>
                    <Box pl={1} flex={1} overflow={"hidden"}>
                      <Typography fontWeight={600}>
                        {follow.user_name}
                      </Typography>
                      <Stack direction={"row"} gap={"5px"}>
                        <Typography fontSize={"12px"}>
                          {follow.first_name}
                        </Typography>
                        <Typography fontSize={"12px"}>
                          {follow.last_name}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Link>

                {follow.follow ? (
                  <FollowingButton
                    follow={follow}
                    handleClick={handleClickFollow}
                  />
                ) : (
                  <FollowButton
                    follow={follow}
                    handleClick={handleClickFollow}
                  />
                )}
              </Box>
            ))}
          </Stack>
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
          {/* <Search /> */}
          {/* <CategoryList /> */}
          <TopFollower
            handleClickFollow={handleClickTopFollow}
            topFollower={topFollower}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Following;
