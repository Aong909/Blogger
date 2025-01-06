import { Box } from "@mui/material";
// import CategoryList from "../components/CategoryList/CategoryList";
import {
  getFollowingByID,
  getTopFollower,
  saveFollow,
  saveUnFollow,
} from "../services";
import { useEffect, useState } from "react";
import { Follow } from "../types";
import TopFollower from "../components/TopFollower/TopFollower";
import FollowList from "../components/FollowList/FollowList";

const Following = () => {
  const [follows, setFollows] = useState<Follow[]>([]);
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

    setFollows(followerDataMapping);
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
    setFollows(updateFollow);
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
          <FollowList follows={follows} handleClickFollow={handleClickFollow} />
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
