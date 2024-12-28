import { LinkOff, OpenInNew } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { removeLink } from "../../util/link";

const Link = ({ attributes, element, children }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlateStatic();

  return (
    <div style={{ display: "inline", position: "relative" }}>
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "6px 10px",
            border: "1px solid lightgray",
            borderRadius: "6px",
            gap: "8px",
          }}
          contentEditable={false}
        >
          <a
            href={element.href}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
            rel="noreferrer"
            target="_blank"
          >
            <OpenInNew />
            {element.href}
          </a>
          <Button onClick={() => removeLink(editor)}>
            <LinkOff />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Link;
