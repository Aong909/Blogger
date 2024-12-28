import { RenderElementProps, useFocused, useSelected } from "slate-react";

const Image = ({ attributes, element, children }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          alt={element?.alt || "image"}
          src={element?.src}
          style={{
            display: "flex",
            maxWidth: "100%",
            maxHeight: "20rem",
            boxShadow: `${selected && focused ? "0 0 0 3px #ffb4b4" : "none"}`,
            justifySelf: "center",
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default Image;
