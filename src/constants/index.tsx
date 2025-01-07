import {
  Bookmark,
  BookmarkBorder,
  BookmarkOutlined,
  BorderColor,
  ChatBubbleOutline,
  Code,
  Dashboard,
  FavoriteBorder,
  FavoriteOutlined,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  HomeRounded,
  Image,
  Link,
  Person,
  PersonAdd,
  Search,
  Settings,
  StrikethroughS,
  Subscript,
  Superscript,
} from "@mui/icons-material";

// export const BASE_URL = "http://localhost:8080";
// export const BASE_URL = "https://server-blogger.onrender.com";
export const BASE_URL = "https://server-blogger.vercel.app";

export const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// export const color1 = "#72BF78";
// export const color2 = "#A0D683";
// export const color3 = "#D3EE98";
// export const color4 = "#FEFF9F";
// export const color5 = "#d3ee98";
// export const color6 = "#3C3352";
//#b398ee
//#eeb398
//#96d2ee
export const sizeIcon = "24px";

export enum RichTextAction {
  Bold = "bold",
  Italics = "italic",
  Underline = "underline",
  Strikethrough = "strikethrough",
  Superscript = "superscript",
  Subscript = "subscript",
  Highlight = "highlight",
  Code = "code",
  LeftAlign = "left",
  CenterAlign = "center",
  RightAlign = "right",
  JustifyAlign = "justify",
  Divider = "divider",
  BlockQuote = "block-quote",
  NumberedList = "numbered-list",
  BulletedList = "bulleted-list",
  Undo = "undo",
  Redo = "redo",
}

export const TEXT_FORMAT_OPTIONS = [
  {
    id: RichTextAction.Bold,
    icon: <FormatBold sx={{ fontSize: sizeIcon }} />,
    label: "Bold",
  },
  {
    id: RichTextAction.Italics,
    icon: <FormatItalic sx={{ fontSize: sizeIcon }} />,
    label: "Italics",
  },
  {
    id: RichTextAction.Underline,
    icon: <FormatUnderlined sx={{ fontSize: sizeIcon }} />,
    label: "Underline",
  },
  {
    id: RichTextAction.Highlight,
    icon: <BorderColor sx={{ fontSize: sizeIcon }} />,
    label: "Highlight",
    // fontSize: 10,
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <StrikethroughS sx={{ fontSize: sizeIcon }} />,
    label: "Strikethrough",
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript sx={{ fontSize: sizeIcon }} />,
    label: "Superscript",
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript sx={{ fontSize: sizeIcon }} />,
    label: "Subscript",
  },
  {
    id: RichTextAction.Code,
    icon: <Code sx={{ fontSize: sizeIcon }} />,
    label: "Code",
  },
];

export const TEXT_BLOCK_OPTIONS = [
  {
    id: RichTextAction.LeftAlign,
    icon: <FormatAlignLeft sx={{ fontSize: sizeIcon }} />,
    label: "Align Left",
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <FormatAlignCenter sx={{ fontSize: sizeIcon }} />,
    label: "Align Center",
  },
  {
    id: RichTextAction.RightAlign,
    icon: <FormatAlignRight sx={{ fontSize: sizeIcon }} />,
    label: "Align Right",
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <FormatAlignJustify sx={{ fontSize: sizeIcon }} />,
    label: "Align Justify",
  },
  {
    id: RichTextAction.BlockQuote,
    icon: <FormatQuote sx={{ fontSize: sizeIcon }} />,
    label: "Block Quote",
  },
  {
    id: RichTextAction.BulletedList,
    icon: <FormatListBulleted sx={{ fontSize: sizeIcon }} />,
    label: "Bulleted List",
  },
  {
    id: RichTextAction.NumberedList,
    icon: <FormatListNumbered sx={{ fontSize: sizeIcon }} />,
    label: "Numbered List",
  },
];

export const INSERT_IMAGE_OPTIONS = {
  id: "image",
  icon: <Image sx={{ fontSize: sizeIcon }} />,
  label: "Insert Image",
};

export const INSERT_LINK_OPTIONS = {
  id: "link",
  icon: <Link sx={{ fontSize: sizeIcon }} />,
  label: "Insert Link",
};

export const NAVBAR_ITEM = [
  {
    id: "home",
    icon: <HomeRounded fontSize="large" />,
    label: "Home",
  },
  {
    id: "bookmark",
    icon: <Bookmark fontSize="large" />,
    label: "Bookmark",
  },
  {
    id: "following",
    icon: <PersonAdd fontSize="large" />,
    label: "Following",
  },
  {
    id: "personal",
    icon: <Person fontSize="large" />,
    label: "Personal",
  },
];

export const LOGO = {
  icon: (
    <Dashboard
      sx={{ fontSize: "44px", color: "#1F4529", paddingRight: "10px" }}
    />
  ),
  smallIcon: <Dashboard sx={{ fontSize: "32px", color: "#1F4529" }} />,
};

export const USER = {
  icon: <Person sx={{ fontSize: "44px" }} />,
  smallIcon: <Person sx={{ fontSize: "32px" }} />,
  largeIcon: <Person sx={{ fontSize: "72px" }} />,
};

export const SETTING = {
  icon: <Settings />,
};

export const SEARCH = {
  icon: <Search sx={{ color: "#1F4529" }} />,
};

export const COMMENT = {
  id: "comment",
  icon: <ChatBubbleOutline sx={{ color: "#3C3352" }} />,
  label: "Comment",
};

export const FAVORITE = {
  id: "favorite",
  iconBorder: <FavoriteBorder sx={{ color: "#3C3352" }} />,
  iconOutlined: <FavoriteOutlined sx={{ color: "#3C3352" }} />,
  label: "Favorite",
};

export const BOOKMARK = {
  id: "bookmark",
  iconBorder: <BookmarkBorder sx={{ color: "#3C3352" }} />,
  iconOutlined: <BookmarkOutlined sx={{ color: "#3C3352" }} />,
  label: "Bookmark",
};
