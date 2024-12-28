import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { USER, FAVORITE, COMMENT, BOOKMARK } from "../../constants";
import { MyEditor } from "../MyEditor/MyEditor";
import { Content } from "../../types";
import {
  deleteContentByBlogID,
  saveBookmark,
  saveFavorite,
  unSaveBookmark,
  unSaveFavorite,
} from "../../api";
import { CalcDate } from "../../util";
import { Link, useNavigate } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";
import PopoverMoreBtn from "../PopoverMoreBtn/PopoverMoreBtn";

type Props = {
  contents: Content[];
  setContent: (value: Content[]) => void;
  setFilterContent: (value: Content[]) => void;
};

const ContentList = ({ contents, setContent, setFilterContent }: Props) => {
  const [user, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popOverContent, setPopOverContent] = useState<Content>();
  const open = Boolean(anchorEl);
  const navigator = useNavigate();

  console.log("popOverContent ===> ", popOverContent);

  const initAllData = async () => {
    const dataUser = localStorage.getItem("user") || "";
    setUser(dataUser);
  };

  useEffect(() => {
    initAllData();
  }, []);

  const handleCLickFavorite = (content: Content) => {
    const updateContents = contents.map((item) => {
      if (item.blog_id === content.blog_id) {
        //action unfavorite
        if (content.favorite) {
          item.favorite = false;
          item.total_like = Number(item.total_like) - 1;
          unSaveFavorite(JSON.parse(user || "").user_id, content.blog_id);
        }
        //action favorite
        else {
          item.favorite = true;
          item.total_like = Number(item.total_like) + 1;
          saveFavorite(JSON.parse(user || "").user_id, content.blog_id);
        }
      }
      return item;
    });
    setContent(updateContents);
  };

  const handleClickBookmark = (content: Content) => {
    const updateContents = contents.map((item) => {
      if (item.blog_id === content.blog_id) {
        if (content.bookmark) {
          item.bookmark = false;
          unSaveBookmark(JSON.parse(user || "").user_id, content.blog_id);
        } else {
          item.bookmark = true;
          saveBookmark(JSON.parse(user || "").user_id, content.blog_id);
        }
      }
      return item;
    });
    setContent(updateContents);
  };

  const handleClickMoreBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: Content
  ) => {
    setAnchorEl(event.currentTarget);
    setPopOverContent(content);
  };

  const handleClickDelete = async (content: Content | undefined) => {
    if (content) {
      await deleteContentByBlogID(content.blog_id);
      const updateContent = contents.filter((item) => {
        return item.blog_id !== content.blog_id;
      });
      setFilterContent(updateContent);
      setContent(updateContent);
      setAnchorEl(null);
    }
  };

  const handleClickEdit = async (content: Content | undefined) => {
    if (content) {
      navigator(`/edit/${content?.blog_id}`);
    }
  };

  const onClose = () => {
    setAnchorEl(null);
    setPopOverContent(undefined);
  };

  if (contents.length === 0) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"30px"}>no Content</Typography>
      </Box>
    );
  }

  return (
    <Stack width={"100%"} gap={2}>
      {contents.map((item) => (
        <Box
          key={item.blog_id}
          p={"10px"}
          display={"flex"}
          borderRadius={"20px"}
          bgcolor={"#FEFF9F"}
        >
          <Link to={`/personal/${item.user_id}`}>
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
                to={`/personal/${item.user_id}`}
                style={{ textDecoration: "none" }}
              >
                <Stack pt={"4px"}>
                  <Stack
                    direction={"row"}
                    gap={1}
                    alignItems={"center"}
                    color={"#3C3352"}
                  >
                    <Typography fontWeight={600}>{item.user_name}</Typography>
                    <Typography fontSize={"12px"}>
                      {item.created_at === item.updated_at
                        ? CalcDate(item.created_at)
                        : `edited ${CalcDate(item.updated_at)}`}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={1}
                    alignItems={"center"}
                    color={"#3C3352"}
                  >
                    <Typography fontSize={"12px"}>{item.first_name}</Typography>
                    <Typography fontSize={"12px"}>{item.last_name}</Typography>
                  </Stack>
                </Stack>
              </Link>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <IconButton
                  onClick={(e) => handleClickMoreBtn(e, item)}
                  disabled={item.user_id !== JSON.parse(user || "").user_id}
                >
                  <MoreHoriz />
                </IconButton>
                {/* <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={() => onClose()}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box>
                    <Typography onClick={() => handleClickEdit(popOverContent)}>
                      Edit
                    </Typography>
                    <Typography
                      onClick={() => handleClickDelete(popOverContent)}
                    >
                      Delete
                    </Typography>
                  </Box>
                </Popover> */}
                <PopoverMoreBtn
                  open={open}
                  anchorEl={anchorEl}
                  onClose={onClose}
                  handleClickDelete={handleClickDelete}
                  handleClickEdit={handleClickEdit}
                  content={popOverContent}
                />
              </Stack>
            </Box>

            <Stack mb={1} width={"100%"}>
              <Link
                to={`/content/${item.blog_id}`}
                style={{ color: "#3C3352", textDecoration: "none" }}
              >
                <MyEditor
                  initialValue={item.blog_content}
                  name={"content"}
                  readOnly
                />
              </Link>

              <Stack
                display={item.categories[0] ? "flex" : "none"}
                direction={"row"}
                flexWrap={"wrap"}
                gap={1}
              >
                {item.categories?.map((item, index) => (
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
                <IconButton onClick={() => handleCLickFavorite(item)}>
                  {item.favorite ? FAVORITE.iconOutlined : FAVORITE.iconBorder}
                </IconButton>
                <Typography>{Number(item.total_like)}</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Link
                  to={`/content/${item.blog_id}`}
                  style={{ color: "#3C3352", textDecoration: "none" }}
                >
                  <IconButton>{COMMENT.icon}</IconButton>
                </Link>
                <Typography>{Number(item.total_comment)}</Typography>
              </Stack>
              <Stack direction={"row"} gap={1}>
                <IconButton onClick={() => handleClickBookmark(item)}>
                  {item.bookmark ? BOOKMARK.iconOutlined : BOOKMARK.iconBorder}
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default ContentList;
