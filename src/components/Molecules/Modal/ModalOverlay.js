import ReactDOM from "react-dom";

export const ModalOverlay = (props) => {
  console.log(props.show);
  const content = (
    <div className={`modal  ${props.className ? props.className : ""}`}>
      <fieldset className="mt-3">
        <legend>{props.title}</legend>
        <form
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault}
        >
          {props.children}
        </form>
      </fieldset>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};
