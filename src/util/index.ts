import { Editor, Element, Transforms } from "slate";
import {
  AlignKey,
  Editor as EditorType,
  ElementKey,
  HeaderElement,
  MarkKey,
} from "../types";
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "../constants";
// import { ReactEditor } from "slate-react";

export const isMarkActive = (editor: EditorType, format: MarkKey) => {
  return !!Editor.marks(editor)?.[format];
};

export const toggleMark = (editor: EditorType, format: MarkKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) editor.removeMark(format);
  else editor.addMark(format, true); // second param not documented. Just pass
};

const isAlignFormat = (format: ElementKey) => TEXT_ALIGN_TYPES.includes(format);
const isListFormat = (format: ElementKey) => LIST_TYPES.includes(format);

export const isBlockActive = (editor: EditorType, format: ElementKey) => {
  const { selection } = editor;
  if (!selection) return false;

  const isAlign = isAlignFormat(format);
  const blockType = isAlign ? "align" : "type";

  const match = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        return (
          !Editor.isEditor(n) && Element.isElement(n) && n[blockType] === format
        );
      },
    })
  );
  return !!match?.[0];
};

export const getHeader = (editor: EditorType): HeaderElement | null => {
  if (!editor.selection) return null;

  const [node] = Array.from(
    Editor.nodes(editor, {
      at: editor.selection,
      match: (n) => (n as HeaderElement).type?.startsWith("h"),
    })
  );
  return node?.[0] as HeaderElement;
};

export const toggleBlock = (editor: EditorType, format: ElementKey) => {
  const isAlign = isAlignFormat(format);
  const isList = isListFormat(format);
  const isActive = isBlockActive(editor, format);

  let align: AlignKey | undefined;
  let type: string | undefined;

  if (isAlign) {
    align = isActive ? undefined : (format as AlignKey);
  } else {
    type = isActive ? "paragraph" : format;
  }

  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      isListFormat(node.type as ElementKey) &&
      !isAlignFormat(format),
    split: true,
  });

  if (isList && !isActive) {
    type = "list-item";
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }

  let newProperties: Partial<Element> = {};
  if (align) newProperties["align"] = align;
  if (type) newProperties["type"] = type;

  Transforms.setNodes<Element>(editor, newProperties);
};

export const CalcDate = (date: string | undefined) => {
  const month_short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (!date) {
    return ``;
  }
  const dateNow = new Date();
  const [yearContent, monthContent, dayContent] = date.slice(0, 10).split("-");

  const tContent = new Date(date).getTime();
  const tDateNow = dateNow.getTime();
  const tDiff = tDateNow - tContent;
  const dayDiff = tDiff / (24 * 3600 * 1000);
  const hourDiff = tDiff / (3600 * 1000);
  const minuteDiff = tDiff / (60 * 1000);

  if (dateNow.getFullYear() - Number(yearContent) > 0) {
    return `${
      month_short[Number(monthContent) - 1]
    } ${dayContent}, ${yearContent}`;
  } else if (dayDiff > 28) {
    return `${month_short[Number(monthContent) - 1]} ${dayContent}`;
  } else if (dayDiff > 7) {
    return `${Math.floor(dayDiff / 7)}w ago`;
  } else if (dayDiff > 1) {
    return `${Math.floor(dayDiff)}d ago`;
  } else if (hourDiff > 1) {
    return `${Math.floor(hourDiff)}h ago`;
  } else if (minuteDiff > 5) {
    return `${Math.floor(minuteDiff)}min ago`;
  } else {
    return `Now`;
  }
};

// export const getUser = () => {
//   try {
//     const data = JSON.parse(localStorage.getItem("user") || "");
//     return data;
//   } catch (error) {
//     return null;
//   }
// };
