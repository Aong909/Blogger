import { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type Props = {
  initialValue: Descendant[] | undefined;
};

const MyReadOnly = ({ initialValue }: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  if (!initialValue) return null;
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable readOnly />
    </Slate>
  );
};

export default MyReadOnly;
