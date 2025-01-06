import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoreHoriz } from "@mui/icons-material";

import TopFollower from "../components/TopFollower/TopFollower";
import { BOOKMARK, COMMENT, FAVORITE, USER } from "../constants";
import {
  deleteContentByBlogID,
  getCommentByID,
  getContentByBlogID,
  getFollowingByID,
  getTopFollower,
  postComment,
  saveFollow,
  saveUnFollow,
} from "../services";
import { Comment, Content as ContentType, Follow } from "../types";
import { MyEditor } from "../components/MyEditor/MyEditor";
import { CalcDate } from "../util";
import PopoverMoreBtn from "../components/PopoverMoreBtn/PopoverMoreBtn";

const Content = () => {
  const { id } = useParams();
  const [userID, setUserID] = useState("");
  const [content, setContent] = useState<ContentType>();
  const [topFollower, setTopFollower] = useState<Follow[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [textValue, setTextValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigator = useNavigate();

  const initAllData = async () => {
    const userData = localStorage.getItem("user") || "";
    const followData: Follow[] = await getFollowingByID(
      JSON.parse(userData || "").user_id
    );
    const topFollowerData: Follow[] = await getTopFollower();
    setUserID(JSON.parse(userData || "").user_id);
    //set content data
    if (id) {
      const contentData = await getContentByBlogID(
        id,
        JSON.parse(userData).user_id
      );
      const commentData = await getCommentByID(id);
      setComments(commentData);
      setContent(contentData);
    }

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
            user_id: JSON.parse(userData || "").user_id,
          };
        } else {
          return {
            ...item,
            follow: false,
            user_id: JSON.parse(userData || "").user_id,
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
    setTopFollower(topFollowMapping);
  };

  useEffect(() => {
    initAllData();
  }, []);

  const handleCLickFavorite = (con: ContentType | undefined) => {
    if (con) {
      if (con.favorite) {
        setContent(() => ({
          ...con,
          favorite: false,
          total_like: Number(con.total_like) - 1,
        }));
      } else {
        setContent(() => ({
          ...con,
          favorite: true,
          total_like: Number(con.total_like) + 1,
        }));
      }
    }
  };

  const handleClickBookmark = (con: ContentType | undefined) => {
    if (con) {
      if (con.bookmark) {
        setContent(() => ({ ...con, bookmark: false }));
      } else {
        setContent(() => ({ ...con, bookmark: true }));
      }
    }
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

  const handleClickComment = async (
    user_id: string | number | undefined,
    blog_id: string | number | undefined
  ) => {
    if (user_id && blog_id && content) {
      const newComment = await postComment(user_id, blog_id, textValue);
      setComments((prev) => [newComment, ...prev]);
      setContent(() => ({
        ...content,
        total_comment: Number(content.total_comment) + 1,
      }));
    }
    setTextValue("");
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = async (con: ContentType | undefined) => {
    if (con) {
      await deleteContentByBlogID(con.blog_id);
      navigator(`/`);
    }
  };

  const handleClickEdit = async (con: ContentType | undefined) => {
    if (con) {
      navigator(`/edit/${con.blog_id}`);
    }
  };

  console.log(content);
  return (
    <div>
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
            <Stack
              width={"100%"}
              bgcolor={"#FEFF9F"}
              borderRadius={"20px"}
              gap={2}
            >
              <Box p={"10px"} display={"flex"}>
                <Link to={`/personal/${content?.user_id}`}>
                  <Box>
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
                  </Box>
                </Link>

                <Box pl={1} width={"100%"}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Link
                      to={`/personal/${content?.user_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Stack pt={"4px"}>
                        <Stack
                          direction={"row"}
                          gap={1}
                          alignItems={"center"}
                          color={"#3C3352"}
                        >
                          <Typography fontWeight={600}>
                            {content?.user_name}
                          </Typography>
                          <Typography fontSize={"12px"}>
                            {CalcDate(content?.created_at)}
                          </Typography>
                        </Stack>
                        <Stack
                          direction={"row"}
                          gap={1}
                          alignItems={"center"}
                          color={"#3C3352"}
                        >
                          <Typography fontSize={"12px"}>
                            {content?.first_name}
                          </Typography>
                          <Typography fontSize={"12px"}>
                            {content?.last_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Link>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <IconButton
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        disabled={content?.user_id !== Number(userID)}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </Stack>

                    <PopoverMoreBtn
                      open={open}
                      anchorEl={anchorEl}
                      onClose={onClose}
                      handleClickDelete={handleClickDelete}
                      handleClickEdit={handleClickEdit}
                      content={content}
                    />
                  </Box>

                  <Stack mb={1} width={"100%"}>
                    <MyEditor
                      initialValue={content?.blog_content}
                      name={"content"}
                      readOnly
                    />
                    <Stack
                      display={content?.categories[0] ? "flex" : "none"}
                      direction={"row"}
                      flexWrap={"wrap"}
                      gap={1}
                      mt={1}
                    >
                      {content?.categories?.map((item, index) => (
                        <Box
                          key={index}
                          bgcolor={"#72BF78"}
                          px={1}
                          py={"4px"}
                          color={"#3C3352"}
                          borderRadius={4}
                          alignItems={"center"}
                          gap={1}
                        >
                          <Typography fontSize={"14px"}>{item}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} gap={5} color={"#3c3352"}>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <IconButton onClick={() => handleCLickFavorite(content)}>
                        {content?.favorite
                          ? FAVORITE.iconOutlined
                          : FAVORITE.iconBorder}
                      </IconButton>
                      <Typography>{Number(content?.total_like)}</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <IconButton>{COMMENT.icon}</IconButton>
                      <Typography>{Number(content?.total_comment)}</Typography>
                    </Stack>

                    <Stack direction={"row"} gap={1}>
                      <IconButton onClick={() => handleClickBookmark(content)}>
                        {content?.bookmark
                          ? BOOKMARK.iconOutlined
                          : BOOKMARK.iconBorder}
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
              <Box width={"100%"} height={"1px"} bgcolor={"#b398ee"}></Box>
              <Box display={"flex"} flexDirection={"column"} p={"10px"} gap={2}>
                <Stack direction={"row"} alignItems={"center"}>
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
                  <Box pl={1} display={"flex"} width={"100%"}>
                    <TextField
                      placeholder={"Post your reply"}
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      multiline
                      fullWidth
                    />
                    <Button
                      onClick={() =>
                        handleClickComment(userID, content?.blog_id)
                      }
                      disabled={!textValue}
                    >
                      Post
                    </Button>
                  </Box>
                </Stack>
                <Stack gap={1}>
                  {comments.map((comment) => (
                    <Box key={comment.id} display={"flex"}>
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
                      <Box pl={1}>
                        <Stack pt={"4px"}>
                          <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                            color={"#3C3352"}
                          >
                            <Typography fontWeight={600}>
                              {comment.user_name}
                            </Typography>
                            <Typography fontSize={"12px"}>
                              {CalcDate(comment.created_at)}
                            </Typography>
                          </Stack>
                          <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                            color={"#3C3352"}
                          >
                            <Typography fontSize={"12px"}>
                              {comment.first_name}
                            </Typography>
                            <Typography fontSize={"12px"}>
                              {comment.last_name}
                            </Typography>
                          </Stack>
                          <Stack pt={"4px"}>
                            <Typography>{comment.content}</Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
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
            <TopFollower
              handleClickFollow={handleClickTopFollow}
              topFollower={topFollower}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Content;
