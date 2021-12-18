import { useRef, useState } from "react";
import { IconButton } from "./IconButton";

export const Sidebar = (props: { onGeneration: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = useRef<NodeJS.Timeout>();

  const delayedSetExpanded = (expanded: boolean) => {
    if (toggle.current) {
      clearTimeout(toggle.current);
    }
    toggle.current = setTimeout(() => {
      setExpanded(expanded);
    }, 250);
  };

  return (
    <div
      onMouseEnter={() => delayedSetExpanded(true)}
      onMouseLeave={() => delayedSetExpanded(false)}
      className={`absolute top-0 left-0 z-20 flex flex-col h-full transition-[background] duration-300 text-lg ${
        expanded ? "bg-gray-800/75" : "bg-gray-800/0"
      }`}
    >
      <IconButton
        icon="CogIcon"
        onClick={props.onGeneration}
        className={`text-white p-6 transition-[background] duration-300 ${
          expanded ? "hover:bg-gray-800" : ""
        }`}
        iconClassName="hover:animate-spin"
      />
      <IconButton
        icon="LogIcon"
        className={`text-white p-6 transition-[background] duration-300 ${
          expanded ? "hover:bg-gray-800" : ""
        }`}
      />
    </div>
  );
};
