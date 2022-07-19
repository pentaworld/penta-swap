import clsx from "clsx";
import { Link as RouterLink, LinkProps } from "react-router-dom";

export const IconLink: React.FC<LinkProps> = ({
  className,
  children,

  ...props
}) => {
  return (
    <RouterLink className={clsx("btn btn-ghost px-0", className)} {...props}>
      {children}
    </RouterLink>
  );
};
