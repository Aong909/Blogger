import { Editor, Transforms, Path } from "slate";
import { ReactEditor } from "slate-react";
import { CustomElement } from "../../../types";

export const createImageNode = (alt: string, src: any) => ({
  type: "image",
  alt,
  src,
  children: [{ text: "" }],
});

export const insertImage = (editor: ReactEditor, url: string) => {
  if (!url) return;

  const { selection } = editor;
  const image = createImageNode("Image", url);

  ReactEditor.focus(editor);

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(
      editor as unknown as Editor,
      selection.focus?.path
    );

    if (editor.isVoid(parentNode as CustomElement) || Node.toString().length) {
      // Insert the new image node after the void node or a node with content
      Transforms.insertNodes(editor as unknown as Editor, image, {
        at: Path.next(parentPath),
        select: true,
      });
    } else {
      // If the node is empty, replace it instead
      Transforms.removeNodes(editor as unknown as Editor, { at: parentPath });
      Transforms.insertNodes(editor as unknown as Editor, image, {
        at: parentPath,
        select: true,
      });
    }
  } else {
    // Insert the new image node at the bottom of the Editor when selection
    // is falsey
    Transforms.insertNodes(editor as unknown as Editor, image, {
      select: true,
    });
  }
};
