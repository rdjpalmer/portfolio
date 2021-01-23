import cx from "classnames";

type ClassNameProp = string | string[] | { [x: string]: boolean };

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: ClassNameProp;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { type, className, children } = props;

  return (
    <button className={cx("button", className)} type={type}>
      {children}
    </button>
  );
}
