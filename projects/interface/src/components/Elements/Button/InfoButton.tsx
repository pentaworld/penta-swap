import clsx from "clsx";

export const InfoButton: React.FC<JSX.IntrinsicElements["button"]> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={clsx("btn-outline btn btn-sm normal-case", className)}
      {...props}
    />
  );
};
