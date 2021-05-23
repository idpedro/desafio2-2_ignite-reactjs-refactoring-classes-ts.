import Modal, { ModalProps } from "../Modal";
import FormFood from "../FormFood";
import { FoodProps } from "../../Hooks/useFoods";

interface ModalEditFoodProps extends Omit<ModalProps, "children"> {
  food?: FoodProps;
}

function ModalEditFood({ isOpen, onRequestClose, food }: ModalEditFoodProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <FormFood
        title={"Editar Prato"}
        submitText={"Editar Prato"}
        food={food}
      />
    </Modal>
  );
}

export default ModalEditFood;
