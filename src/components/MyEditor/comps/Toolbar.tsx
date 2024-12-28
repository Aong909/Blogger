import {
  getHeader,
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "../../../util";
import { useSlate } from "slate-react";
import { Box, ButtonGroup, IconButton, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

import { Divider } from "./Divider";
import {
  HEADINGS,
  INSERT_IMAGE_OPTIONS,
  INSERT_LINK_OPTIONS,
  LOGO,
  RichTextAction,
  TEXT_BLOCK_OPTIONS,
  TEXT_FORMAT_OPTIONS,
} from "../../../constants";
import { ElementKey, HeaderElement, MarkKey } from "../../../types";
import FormInsert from "./FormInsert";
import { Link } from "react-router-dom";

type Props = {};

const Toolbar = ({}: Props) => {
  const editor = useSlate();
  const [header, setHeader] = useState<HeaderElement | string | undefined>(
    "paragraph"
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [insertType, setInsertType] = useState("");
  const open = Boolean(anchorEl);

  const onMarkClick = (format: RichTextAction) => {
    toggleMark(editor, format as MarkKey);
  };

  const onBlockClick = (format: RichTextAction) => {
    toggleBlock(editor, format as ElementKey);
  };

  const onHeadingClick = (format: string) => {
    toggleBlock(editor, format as ElementKey);
  };

  const handleClickLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setInsertType(INSERT_LINK_OPTIONS.id);
  };
  const handleClickImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setInsertType(INSERT_IMAGE_OPTIONS.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headerType = getHeader(editor);

  useEffect(() => {
    if (headerType) {
      setHeader(headerType.type);
    } else {
      setHeader("paragraph");
    }
  }, [headerType]);
  return (
    <Box height={"20px"} mb={"40px"}>
      <ButtonGroup sx={{ gap: "4px" }}>
        <Link to="/home">
          <IconButton
            sx={{
              height: "100%",
              borderRadius: "10px",
              "&:hover": {
                background: "#9bdfa1",
              },
            }}
          >
            {LOGO.smallIcon}
          </IconButton>
        </Link>
        <Select
          value={header as string}
          onChange={(e) => {
            onHeadingClick(e.target.value as string);
            setHeader(e.target.value as string);
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#feff9f",
              },
            },
          }}
        >
          <MenuItem value={"paragraph"}>paragraph</MenuItem>
          {HEADINGS.map((heading) => (
            <MenuItem key={heading} value={heading}>
              {`${heading}`}
            </MenuItem>
          ))}
        </Select>
        {TEXT_FORMAT_OPTIONS.map((item) => (
          <IconButton
            key={item.id}
            aria-label={item.label}
            size="small"
            sx={
              isMarkActive(editor, item.id as MarkKey)
                ? {
                    bgcolor: "#72BF78",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#9bdfa1",
                    },
                  }
                : {
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#9bdfa1",
                    },
                  }
            }
            onMouseDown={(e) => {
              e.preventDefault();
              onMarkClick(item.id);
            }}
          >
            {item.icon}
          </IconButton>
        ))}
        <Divider />
        {TEXT_BLOCK_OPTIONS.map((item) => (
          <IconButton
            key={item.id}
            aria-label={item.label}
            onMouseDown={(e) => {
              e.preventDefault();
              onBlockClick(item.id);
            }}
            size="small"
            sx={
              isBlockActive(editor, item.id as ElementKey)
                ? {
                    bgcolor: "#72BF78",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#9bdfa1",
                    },
                  }
                : {
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#9bdfa1",
                    },
                  }
            }
          >
            {item.icon}
          </IconButton>
        ))}
        <Divider />
        <IconButton
          aria-describedby={INSERT_IMAGE_OPTIONS.id}
          onClick={handleClickImage}
          sx={{
            borderRadius: "10px",
            "&:hover": {
              background: "#9bdfa1",
            },
          }}
        >
          {INSERT_IMAGE_OPTIONS.icon}
        </IconButton>
        <IconButton
          aria-describedby={INSERT_LINK_OPTIONS.id}
          onClick={handleClickLink}
          sx={{
            borderRadius: "10px",
            "&:hover": {
              background: "#9bdfa1",
            },
          }}
        >
          {INSERT_LINK_OPTIONS.icon}
        </IconButton>
      </ButtonGroup>
      <FormInsert
        open={open}
        id={insertType}
        anchorEl={anchorEl}
        onClose={handleClose}
        editor={editor}
      />
    </Box>
  );
};

export default Toolbar;
