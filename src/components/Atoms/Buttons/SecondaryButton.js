export const SecondaryButton = ({
  text,
  type,
  onClick,
  disabled,
  className,
  btnClass,
}) => {
  return (
    <button
      className={`btn ${btnClass ? btnClass : "btn-outline-primary"} ${
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
