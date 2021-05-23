import { ReactNode } from "react";
import ReactModal from "react-modal";
import { ModalStyle } from "./styles";

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode | ReactNode[];
}

ReactModal.setAppElement("#root");

function Modal({ isOpen, onRequestClose, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyle}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
