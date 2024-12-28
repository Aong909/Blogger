import { Popover, Box, Typography, Stack } from "@mui/material";
import { Content } from "../../types";

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleClickEdit: (value: Content | undefined) => void;
  handleClickDelete: (value: Content | undefined) => void;
  content: Content | undefined;
};

const PopoverMoreBtn = ({
  open,
  anchorEl,
  onClose,
  handleClickEdit,
  handleClickDelete,
  content,
}: Props) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"#7cc983"}
        gap={1}
        py={0.5}
      >
        <Stack
          px={2}
          onClick={() => handleClickEdit(content)}
          sx={{
            cursor: "pointer",
            ":hover": {
              bgcolor: "#fcfcfc62",
              color: "#004606",
            },
          }}
        >
          <Typography>Edit</Typography>
        </Stack>
        <Stack
          px={2}
          onClick={() => handleClickDelete(content)}
          sx={{
            cursor: "pointer",
            ":hover": {
              bgcolor: "#fcfcfc62",
            },
          }}
        >
          <Typography>Delete</Typography>
        </Stack>
      </Box>
    </Popover>
  );
};

export default PopoverMoreBtn;
