import FormFood from "../FormFood";
import Modal, { ModalProps } from "../Modal";

interface modalAddFoodProps extends Omit<ModalProps, "children"> {}

export function ModalAddFood({ isOpen, onRequestClose }: modalAddFoodProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <FormFood title={"Novo Prato"} submitText={"Adicionar Prato"} />
    </Modal>
  );
}

export default ModalAddFood;
