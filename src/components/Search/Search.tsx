import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Stack,
} from "@mui/material";

import { SEARCH, USER } from "../../constants";
import { getAllCategory, getAllUser } from "../../api";
import { Category, Content, User } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  contents: Content[];
  setContent: (value: Content[]) => void;
};

const Search = ({ contents, setContent }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filterUsers, setFilterUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterCategories, setFilterCategories] = useState<Category[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  console.log("isDropdownVisible", isDropdownVisible);
  const initData = async () => {
    setCategories(await getAllCategory());
    setUsers(await getAllUser());
  };

  useEffect(() => {
    initData();
  }, []);

  const handleTextFieldFocus = () => {
    setIsDropdownVisible(true);
  };
  const handleTextSearchBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  const handleSearchChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value.toLowerCase());
    console.log(el.target.value, Boolean(el.target.value));
    if (!el.target.value) {
      setFilterCategories([]);
      setFilterUsers([]);
    } else {
      const updateFilterCategory = categories.filter((cat) => {
        return cat.category_name
          .toLowerCase()
          .includes(el.target.value.toLowerCase());
      });

      const updateFilterUsers = users.filter((user) => {
        return (
          user.user_name
            .toLowerCase()
            .includes(el.target.value.toLowerCase()) ||
          user.first_name
            .toLowerCase()
            .includes(el.target.value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(el.target.value.toLowerCase())
        );
      });
      setFilterCategories(updateFilterCategory);
      setFilterUsers(updateFilterUsers);
    }
  };

  const handleClick = (category_name: string) => {
    const updateContents = contents.filter((content) => {
      //if same category return content
      if (content.categories.some((cat) => cat === category_name)) {
        return content;
      }
    });
    setContent(updateContents);
    setFilterCategories([]);
    setFilterUsers([]);
    setSearchValue("");
  };

  const Dropdown = () => {
    if (filterCategories.length === 0 && filterUsers.length === 0) {
      return (
        <Box
          position={"absolute"}
          p={1}
          width={"100%"}
          bgcolor={"#d3ee98"}
          border={"1px solid #b398ee"}
          borderRadius={"10px"}
          sx={{ boxSizing: "border-box", boxShadow: 3 }}
        >
          <Typography align="center">
            Try searching for user or category
          </Typography>
        </Box>
      );
    }
    return (
      <Box
        position={"absolute"}
        p={1}
        width={"100%"}
        bgcolor={"#d3ee98"}
        border={"1px solid #b398ee"}
        borderRadius={"10px"}
        sx={{ boxSizing: "border-box", boxShadow: 3 }}
      >
        {filterCategories.map((cat) => (
          <Box
            key={cat.category_id}
            display={"flex"}
            alignItems={"center"}
            py={1}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClick(cat.category_name)}
          >
            {SEARCH.icon}
            <Typography fontWeight={600} color="#3c3352">
              {cat.category_name}
            </Typography>
          </Box>
        ))}
        {filterUsers.length !== 0 && filterCategories.length !== 0 ? (
          <Box
            position={"absolute"}
            left={1}
            width={"100%"}
            height={"1px"}
            bgcolor={"#b398ee"}
          ></Box>
        ) : null}
        {filterUsers.map((user) => (
          <Link
            to={`/personal/${user.user_id}`}
            key={user.user_id}
            style={{ color: "#3C3352", textDecoration: "none" }}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              flex={1}
              alignItems={"center"}
              py={1}
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
                <Typography fontWeight={600}>{user.user_name}</Typography>
                <Stack direction={"row"} gap={"5px"}>
                  <Typography fontSize={"12px"}>{user.first_name}</Typography>
                  <Typography fontSize={"12px"}>{user.last_name}</Typography>
                </Stack>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <Box position={"relative"}>
      <TextField
        fullWidth
        type="search"
        variant={"filled"}
        value={searchValue}
        slotProps={{
          input: {
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">{SEARCH.icon}</InputAdornment>
            ),
            sx: {
              height: "38px",
              borderRadius: "25px",
              textAlign: "center",
              paddingBottom: "16px",
              bgcolor: "rgba(60,51,82,0.2)",
              color: "#3C3352",
              "&:focus-within": {
                border: "1px solid #3C3352",
              },
              ":hover": {
                border: "1px solid #3C3352",
              },
            },
          },
        }}
        onInput={handleSearchChange}
        onFocus={handleTextFieldFocus}
        onBlur={handleTextSearchBlur}
      />
      {isDropdownVisible && <Dropdown />}
    </Box>
  );
};

export default Search;
