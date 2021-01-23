import cx from "classnames";

type ClassNameProp = string | string[] | { [x: string]: boolean };

interface InputProps {
  label: string;
  name: HTMLInputElement["name"];
  type?: HTMLInputElement["type"];
  className?: ClassNameProp;
  placeholder?: HTMLInputElement["placeholder"];
  required?: boolean;
}

export default function Input(props: InputProps) {
  const {
    name,
    label,
    type = "text",
    placeholder,
    className,
    required,
    ...rest
  } = props;

  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        type={type}
        className={cx("input", className)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
