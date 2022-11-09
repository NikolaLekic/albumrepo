export const SelectInput = ({
  placeholder,
  data,
  onClick,
  buttonValue,
  dropdownClassName,
}) => {
  return (
    <div className="dropdown">
      <button
        className={`${
          dropdownClassName ? dropdownClassName : "btn btn-outline-primary"
        }  dropdown-toggle`}
        type="button"
        id="dropdownMenu2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {placeholder}
      </button>
      <ul
        className="dropdown-menu my-custom-scrollbar"
        aria-labelledby="dropdownMenu2"
      >
        {data?.map((item) => {
          return (
            <li key={item.id} id={item.id}>
              <button
                className="dropdown-item"
                id={item.id}
                type="button"
                onClick={onClick}
              >
                {item[buttonValue]}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
