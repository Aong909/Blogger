import React, { useState } from "react";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Box } from "@mui/material";
import pipe from "lodash/fp/pipe";

import { CustomElement, CustomText, Editor } from "../../types";
import { toggleMark } from "../../util";

import Toolbar from "./comps/Toolbar";
import withImages from "./plugins/withImage";
import withLinks from "./plugins/withLinks";
import Link from "./elements/Link";
import Image from "./elements/Image";

interface MyEditorProps {
  initialValue: Descendant[] | undefined;
  onChange?: (value: Descendant[]) => void;
  placeholder?: string;
  name: string;
  readOnly?: boolean;
}

declare module "slate" {
  interface CustomTypes {
    Editor: Editor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  return (
    <span
      {...attributes}
      style={{
        ...(leaf.bold && { fontWeight: "bold" }),
        ...(leaf.code && {
          color: "#F7F7F7",
          padding: 2,
          background: "#2E2B29",
          fontFamily: "monospace",
          fontSize: 12,
          borderRadius: ".2rem",
        }),
        ...(leaf.italic && { fontStyle: "italic" }),
        ...(leaf.underline && { textDecoration: "underline" }),
        ...(leaf.strikethrough && { textDecoration: "line-through" }),
        ...(leaf.highlight && {
          color: "black",
          padding: 2,
          background: "#d7acff",
          // border: "1px solid #c6c202",
        }),
      }}
    >
      {children}
    </span>
  );
};

const RenderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
const RenderElement = (props: RenderElementProps) => <Element {...props} />;

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={{
            ...style,
            borderLeft: "2px solid #ddd",
            paddingLeft: "10px",
            color: "#aaa",
            fontStyle: "italic",
          }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "h1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );

    case "h4":
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "link":
      return <Link {...props} />;
    case "image":
      return <Image {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImages,
  withLinks
);

export const MyEditor: React.FC<MyEditorProps> = React.memo(function MyEditor({
  initialValue,
  onChange,
  placeholder,
  name,
  readOnly,
}) {
  if (!initialValue) return null;

  const [editor] = useState(() => createEditorWithPlugins(createEditor()));

  const onRichTextKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    const key = event?.key?.toLowerCase();

    if (key === "b" && event?.ctrlKey) {
      toggleMark(editor, "bold");
    }
    if (key === "i" && event?.ctrlKey) {
      toggleMark(editor, "italic");
    }
    if (key === "u" && event?.ctrlKey) {
      toggleMark(editor, "underline");
    }
    if (key === "z" && event?.ctrlKey) {
      editor.undo();
    }
    if (key === "y" && event?.ctrlKey) {
      editor.redo();
    }
  };

  return (
    <Box>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(e) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange && onChange) {
            onChange(e);
          }
        }}
      >
        <Box display={"flex"} justifyContent={"center"}>
          {!readOnly && <Toolbar />}
        </Box>
        <Box>
          <Editable
            name={name}
            placeholder={placeholder}
            autoFocus
            style={
              readOnly
                ? {}
                : {
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    fontSize: 18,
                    height: "100%",
                    minHeight: "200px",
                    border: "2px solid #1f4529",
                    backgroundColor: "#fcfcfc",
                    borderRadius: "10px",
                    overflowX: "hidden",
                    overflowY: "inherit",
                  }
            }
            renderLeaf={RenderLeaf}
            renderElement={RenderElement}
            onKeyDown={onRichTextKeyDown}
            renderPlaceholder={({ children, attributes }) => (
              <p {...attributes}>{children}</p>
            )}
            readOnly={!!readOnly}
          />
        </Box>
      </Slate>
    </Box>
  );
});
