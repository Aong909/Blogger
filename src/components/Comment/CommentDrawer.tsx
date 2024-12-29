import { Drawer, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Comment } from "../../types";
import { getCommentByID } from "../../api";

type Props = {
  content_id: number;
  openComment: boolean;
  setOpenComment: (value: boolean) => void;
};

const CommentDrawer = ({ content_id, openComment, setOpenComment }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const initData = async () => {
      const commentData: Comment[] = await getCommentByID(content_id);
      setComments(commentData);
    };

    initData();
  }, []);

  return (
    <Drawer
      anchor="bottom"
      open={openComment}
      onClose={() => setOpenComment(false)}
      slotProps={{
        backdrop: {
          sx: { bgcolor: "#0000000a" },
        },
      }}
    >
      <Box
        position={"fixed"}
        top={"50%"}
        left={"50%"}
        width={"500px"}
        height={"500px"}
        borderRadius={"20px"}
        bgcolor={"#D3EE98"}
        p={2}
        pb={5}
        sx={{ transform: "translate(-50%,-50%)" }}
      >
        <Stack sx={{ cursor: "pointer" }} onClick={() => setOpenComment(false)}>
          ✖
        </Stack>
        <Stack>
          {comments.map((comment) => (
            <Box>{comment.content}</Box>
          ))}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CommentDrawer;
