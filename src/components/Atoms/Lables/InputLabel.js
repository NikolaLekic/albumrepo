export const InputLabel = ({ text, htmlFor }) => {
  return (
    <label className="fw-bold text-uppercase" htmlFor={htmlFor}>
      {text}
    </label>
  );
};
