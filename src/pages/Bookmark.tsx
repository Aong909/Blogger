import { Box } from "@mui/material";
import CategoryList from "../components/CategoryList/CategoryList";
import ContentList from "../components/ContentList/ContentList";
import Search from "../components/Search/Search";
import { getAllContent, getBookmarkByID, getFavoriteByID } from "../api";
import { useEffect, useState } from "react";
import { Content, Blog_id } from "../types";

const Bookmark = () => {
  const [contents, setContent] = useState<Content[]>([]);
  const [filterContent, setFilterContent] = useState<Content[]>([]);

  const initData = async () => {
    const dataUser = localStorage.getItem("user") || "";

    const allContent: Content[] = await getAllContent();
    const bookmarkByID: Blog_id[] = await getBookmarkByID(
      JSON.parse(dataUser || "").user_id
    );
    const favoriteByID: Blog_id[] = await getFavoriteByID(
      JSON.parse(dataUser || "").user_id
    );

    const contentMapping = allContent
      .filter((content) => {
        return bookmarkByID.some((book) => book.blog_id === content.blog_id);
      })
      .map((content) => {
        return {
          ...content,
          favorite: favoriteByID.some((fav) => fav.blog_id === content.blog_id),
          bookmark: true,
        };
      });
    setContent(contentMapping);
    setFilterContent(contentMapping);
  };

  useEffect(() => {
    initData();
  }, []);

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
          <ContentList
            contents={filterContent}
            setContent={setContent}
            setFilterContent={setFilterContent}
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
          <Search contents={contents} setContent={setFilterContent} />
          <CategoryList contents={contents} setContent={setFilterContent} />
        </Box>
      </Box>
    </Box>
  );
};

export default Bookmark;
