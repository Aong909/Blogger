import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Category, Content } from "../../types";
import { getTopCategory } from "../../services";

type Props = {
  contents: Content[];
  setContent: (value: Content[]) => void;
};

const CategoryList = ({ contents, setContent }: Props) => {
  const [category, setCategory] = useState<Category[]>([]);

  const AllCategory = async () => {
    setCategory(await getTopCategory());
  };

  useEffect(() => {
    AllCategory();
  }, []);

  const handleClickCategory = (category_name: string) => {
    const updateContents = contents.filter((content) => {
      //if same category return content
      if (content.categories.some((cat) => cat === category_name)) {
        return content;
      }
    });
    setContent(updateContents);
  };
  return (
    <Box
      py={"10px"}
      px={"14px"}
      borderRadius={"20px"}
      border={"1px solid #1F4529"}
    >
      <Typography mb={2}>Popular category</Typography>
      <Stack gap={2} overflow={"hidden"} height={"auto"}>
        {category.map((el, index) => (
          <Box
            key={el.category_id}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickCategory(el.category_name)}
          >
            <Stack>
              <Typography fontSize={"12px"} color="#3c3352">{`${
                index + 1
              }. Trending`}</Typography>
              <Typography fontWeight={600} color="#3c3352">
                {el.category_name}
              </Typography>
              <Typography
                fontSize={"12px"}
                color="#3c3352"
              >{`${el.total} post`}</Typography>
            </Stack>
            <Stack>
              <Typography fontSize={"20px"} fontWeight={600}>
                ...
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryList;
