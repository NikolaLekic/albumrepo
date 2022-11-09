export const PrimaryButton = ({
  text,
  type,
  onClick,
  disabled,
  className,
  btnClass,
}) => {
  return (
    <button
      className={`btn ${btnClass ? btnClass : "btn-primary"} ${
        className ? className : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type ? type : "button"}
    >
      {text}
    </button>
  );
};
