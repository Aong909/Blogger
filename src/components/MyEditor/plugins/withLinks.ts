import { Editor } from "../../../types";

const withLinks = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = (element) =>
    element.type === "link" ? true : isInline(element);

  return editor;
};

export default withLinks;
