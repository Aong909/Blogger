import { Box, Stack, Typography } from "@mui/material";
import { Follow } from "../../types";
import { USER } from "../../constants";
import FollowButton from "../ButtonFollow/FollowButton";
import FollowingButton from "../ButtonFollow/FollowingButton";
import { Link } from "react-router-dom";

type Props = {
  topFollower: Follow[];
  handleClickFollow: (Follow: Follow) => void;
};

const TopFollower = ({ handleClickFollow, topFollower }: Props) => {
  return (
    <Box py={"10px"} px={"14px"} borderRadius={"20px"} bgcolor={"#FEFF9F"}>
      <Typography mb={2}>Recommended</Typography>

      {topFollower.map((follow) => (
        <Box
          key={follow.following_id}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"4px"}
            py={1}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link
              to={{
                pathname: `/personal/${follow.following_id}`,
              }}
              style={{ color: "#3C3352", textDecoration: "none" }}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                flex={1}
                alignItems={"center"}
                mr={"4px"}
                maxWidth={"160px"}
                overflow={"hidden"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"38px"}
                  height={"38px"}
                  borderRadius={"100%"}
                  bgcolor={"#72BF78"}
                  color={"#3C3352"}
                >
                  {USER.smallIcon}
                </Box>
                <Box pl={"4px"} flex={1} overflow={"hidden"}>
                  <Typography fontWeight={600}>{follow.user_name}</Typography>
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
              <FollowButton follow={follow} handleClick={handleClickFollow} />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TopFollower;
