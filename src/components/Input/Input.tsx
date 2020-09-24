import cx from "classnames";

type ClassNameProp = string | string[] | { [x: string]: boolean };

interface InputProps {
  name: HTMLInputElement["name"];
  type?: HTMLInputElement["type"];
  className?: ClassNameProp;
  placeholder?: HTMLInputElement["placeholder"];
}

export default function Input(props: InputProps) {
  const { name, type = "text", placeholder, className, ...rest } = props;

  return (
    <input
      {...rest}
      name={name}
      type={type}
      className={cx("input", className)}
      placeholder={placeholder}
    />
  );
}
