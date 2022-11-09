import { ModalOverlay } from "./ModalOverlay";
import { Backdrop } from "./Backdrop";

export const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </>
  );
};
