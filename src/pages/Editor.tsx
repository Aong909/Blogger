import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Descendant } from "slate";

import { MyEditor } from "../components/MyEditor/MyEditor";
import {
  getAllCategory,
  getContentByBlogID,
  saveContent,
  updateContent,
} from "../services";
import { Category, Content, User } from "../types";
import { useNavigate, useParams } from "react-router-dom";

const Editor = () => {
  const [value, setValue] = useState<Descendant[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterCategory, setFilterCategory] = useState<Category[]>([]);
  const [contentCategory, setContentCategory] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState<Descendant[]>();

  //initial value
  const initAllData = async () => {
    //get all category
    const allCategory = await getAllCategory();
    setCategories(allCategory);

    if (id) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const contentByID: Content = await getContentByBlogID(id, user.user_id);
      //set init value by edit page
      setInitialValue(contentByID.blog_content);
      //set category by edit page
      setContentCategory(contentByID.categories);
    } else {
      //set default init value
      setInitialValue([
        {
          type: "h1",
          children: [{ text: "" }],
        },
      ]);
    }
  };

  //handle input category
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.includes(" ")) {
      setCategory(e.target.value);

      if (e.target.value === "") {
        setFilterCategory([]);
      } else {
        const filter = categories.filter((item) =>
          item.category_name.toLowerCase().includes(e.target.value)
        );
        setFilterCategory(filter);
      }
    }
  };

  const handleAddCategory = () => {
    setContentCategory((prev) => [...prev, category.toLowerCase()]);
    setCategory("");
    setFilterCategory([]);
  };

  //handle delete category
  const handleClickCancelCategory = (item: string) => {
    setContentCategory(contentCategory.filter((e) => e !== item));
  };

  //handle post content
  const handleClickPost = async () => {
    if (id) {
      await updateContent(id, value, contentCategory);
    } else {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      await saveContent(user.user_id, value, contentCategory);
    }

    navigator("/");
  };

  useEffect(() => {
    initAllData();
  }, []);

  return (
    <Box py={2} width={"850px"} mx={"auto"}>
      <MyEditor
        // placeholder="Enter Post"
        name="post"
        initialValue={initialValue}
        onChange={(newValue) => setValue(newValue)}
      />
      <Box pb={2}>
        <Stack direction={"row"} p={1} flexWrap={"wrap"} gap={1}>
          {contentCategory.map((item, index) => (
            <Box
              key={index}
              bgcolor={"#72BF78"}
              px={1}
              py={"4px"}
              color={"#3C3352"}
              borderRadius={4}
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <Typography fontSize={"14px"}>{item}</Typography>
              <IconButton
                onClick={() => handleClickCancelCategory(item)}
                sx={{
                  width: "24px",
                  height: "24px",
                  bgcolor: "#0000001f",
                }}
              >
                <Typography>✖</Typography>
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} gap={1} position={"relative"}>
          <TextField
            id="categoryField"
            value={category}
            onInput={handleChangeCategory}
            type="search"
            placeholder="category must not contain any space"
            sx={{ flex: "1" }}
          />
          {Boolean(filterCategory) && (
            <Box
              bgcolor={"#FEFF9F"}
              border={"1px solid #72BF78"}
              borderRadius={5}
              flex={1}
              position={"absolute"}
              top={"54px"}
              maxHeight={"300px"}
              zIndex={"999"}
              sx={{ overflowX: "none", overflowY: "scroll" }}
            >
              <Stack>
                {filterCategory.map((item) => (
                  <Button
                    key={item.category_id}
                    onClick={() => {
                      setCategory(item.category_name);
                      setFilterCategory([]);
                    }}
                  >
                    {item.category_name}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          <Button
            disabled={
              Boolean(category)
                ? contentCategory.includes(category.toLowerCase())
                  ? true
                  : false
                : true
            }
            onClick={handleAddCategory}
          >
            {Boolean(category)
              ? contentCategory.includes(category.toLowerCase())
                ? "Duplicate category"
                : "Add Category"
              : "Empty category"}
          </Button>
        </Stack>
      </Box>
      <Stack width={"full"}>
        <Button
          color="success"
          onClick={handleClickPost}
          sx={{
            bgcolor: "#72BF78",
            borderRadius: "20px",
            color: "#3C3352",
            ":disabled": {
              bgcolor: "#6cc073ff",
              color: "#8d8d8d",
            },
          }}
          disabled={!value}
        >
          <Typography fontSize={"18px"} fontWeight={600}>
            {id ? "edit" : "post"}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Editor;
