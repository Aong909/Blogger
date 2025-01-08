import { Box, Button, Popover, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { insertLink } from "../util/link";
import { Editor } from "../../../types";
import { insertImage } from "../util/image";

type Props = {
  open: boolean;
  id: string;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  editor: Editor;
};

const FormInsert = ({ id, open, anchorEl, onClose, editor }: Props) => {
  const [value, setValue] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id === "link") {
      insertLink(editor, value);
    } else if (id === "image") {
      insertImage(editor, value);
    }
    setValue("");
  };
  return (
    <Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          component={"form"}
          border={1}
          borderColor={"#1f4529"}
          bgcolor={"#fcfcfc"}
          py={2}
          px={1}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Stack direction={"row"} gap={"4px"}>
            <TextField
              label={id == "link" ? "Insert link" : "Insert image link"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              sx={{
                //default border color
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${"#69774C"}`,
                },
                //focus border color
                "& .Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#006F07",
                  },
                },
                //hover border and label color
                "&:hover:not(.Mui-focused)": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#5E9662",
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "#5E9662",
                  },
                },
                //label
                "& .MuiInputLabel-outlined": {
                  color: `${"#69774C"}`,
                  //focus label
                  "&.Mui-focused": {
                    color: "#006F07",
                    fontWeight: "bold",
                  },
                },
              }}
            />

            <Button
              type="submit"
              sx={{
                borderRadius: "20px",
                border: 1,
                borderColor: "#1f4529",
                color: "#1f4529",
              }}
            >
              Insert
            </Button>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
};

export default FormInsert;
