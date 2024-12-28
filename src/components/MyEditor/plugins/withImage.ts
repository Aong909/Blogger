import { Editor } from "../../../types";

const withImages = (editor: Editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === "image" ? true : isVoid(element);

  return editor;
};

export default withImages;
