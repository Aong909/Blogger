import { BaseEditor, BaseElement, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type AlignKey = "left" | "right" | "center" | "justify";
export type CustomElement = {
  src?: string | undefined;
  alt?: string;
  href?: string | undefined;
  type: string;
  children: CustomText[];
  align?: AlignKey;
};
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
};
export type Editor = BaseEditor & ReactEditor & HistoryEditor;
export type MarkKey = keyof Omit<CustomText, "text">;
export type ElementKey =
  | AlignKey
  | "block-quote"
  | "bulleted-list"
  | "numbered-list"
  | "list-item"
  | "header";

export type User = {
  user_id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  user_role: string;
  created_at: string;
};

export interface UserProfile {
  user_id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  created_at: string;
  email: string;
  following: string;
  follower: string;
}

export interface UpdateUserProfile {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type Category = {
  category_id: number;
  category_name: string;
  total: number;
};

export type Content = {
  blog_id: number;
  blog_content: Descendant[];
  created_at: string;
  updated_at: string;
  user_id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  total_like: number;
  total_comment: number;
  categories: string[];
  favorite: boolean;
  bookmark: boolean;
};

export interface Follow {
  user_id: number;
  following_id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  follower?: number;
  follow?: boolean;
}

export interface TopFollow {
  user_id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  follower: number;
  follow?: boolean;
}

export interface Blog_id {
  blog_id: number;
}

export interface Comment {
  id: number;
  content: string;
  user_id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  blog_id: number;
  parent?: number;
  created_at: string;
}
// export type Header = {
//   type: string;
//   children: Children[];
//   align?: string;
// };

// export type Children = {
//   text: string;
//   highlight?: boolean;
// };

export type HeaderElement = BaseElement & {
  type: "header" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
