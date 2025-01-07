import { Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { USER } from "../../constants";
import FollowButton from "../ButtonFollow/FollowButton";
import FollowingButton from "../ButtonFollow/FollowingButton";
import { Follow } from "../../types";

type Props = {
  follows: Follow[];
  handleClickFollow: (follow: Follow) => void;
};

const FollowList = ({ follows, handleClickFollow }: Props) => {
  if (!follows.length) {
    return (
      <Stack alignItems={"center"}>
        <Typography fontSize={"30px"}>You are not following anyone.</Typography>
      </Stack>
    );
  }
  return (
    <Stack gap={1}>
      {follows.map((follow) => (
        <Box
          key={follow.following_id}
          p={"10px"}
          display={"flex"}
          borderBottom={"1px solid #1F4529"}
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
                <Typography fontWeight={600}>{follow.user_name}</Typography>
                <Stack direction={"row"} gap={"5px"}>
                  <Typography fontSize={"12px"}>{follow.first_name}</Typography>
                  <Typography fontSize={"12px"}>{follow.last_name}</Typography>
                </Stack>
              </Box>
            </Box>
          </Link>

          {follow.follow ? (
            <FollowingButton follow={follow} handleClick={handleClickFollow} />
          ) : (
            <FollowButton follow={follow} handleClick={handleClickFollow} />
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default FollowList;
