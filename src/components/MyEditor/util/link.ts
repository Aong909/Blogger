import { Editor, Transforms, Path, Range, Element } from "slate";
import { ReactEditor } from "slate-react";

import { createParagraphNode } from "./paragraph";
import { CustomElement } from "../../../types";

export const createLinkNode = (href: any, text: string): CustomElement => ({
  type: "link",
  href,
  children: [{ text }],
});

export const removeLink = (editor: ReactEditor, opts = {}) => {
  Transforms.unwrapNodes(editor as unknown as Editor, {
    ...opts,
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};

export const insertLink = (editor: ReactEditor, url: string) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, "New Link");

  ReactEditor.focus(editor);

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor as unknown as Editor,
      selection.focus?.path
    );

    // Remove the Link node if we're inserting a new link node inside of another
    // link.
    if ((parentNode as CustomElement).type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parentNode as CustomElement)) {
      // Insert the new link after the void node
      Transforms.insertNodes(
        editor as unknown as Editor,
        createParagraphNode([link as any]),
        {
          at: Path.next(parentPath),
          select: true,
        }
      );
    } else if (Range.isCollapsed(selection)) {
      // Insert the new link in our last known locatio
      Transforms.insertNodes(editor as unknown as Editor, link, {
        select: true,
      });
    } else {
      // Wrap the currently selected range of text into a Link
      Transforms.wrapNodes(editor as unknown as Editor, link, { split: true });
      Transforms.collapse(editor as unknown as Editor, { edge: "end" });
    }
  } else {
    // Insert the new link node at the bottom of the Editor when selection
    // is falsey
    Transforms.insertNodes(
      editor as unknown as Editor,
      createParagraphNode([link as any])
    );
  }
};
