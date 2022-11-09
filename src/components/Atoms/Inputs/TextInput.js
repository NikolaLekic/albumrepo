export const TextInput = ({
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
      type={"text"}
      placeholder={placeholder}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};
