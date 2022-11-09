export const PasswordInput = ({
  placeholder,
  id,
  required,
  value,
  onChange,
  name,
  className,
}) => {
  return (
    <input
      type={"password"}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    />
  );
};
