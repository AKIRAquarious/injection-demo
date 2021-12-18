import * as Icons from "../icons";

export const IconButton = (props: {
  icon: keyof typeof Icons;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}) => {
  const {
    icon,
    tooltip = "",
    onClick,
    className = "",
    iconClassName = "",
  } = props;
  const Icon = Icons[icon];

  return (
    <button onClick={onClick} className={className}>
      <Icon className={`h-8 w-8 ${iconClassName}`} />
    </button>
  );
};
