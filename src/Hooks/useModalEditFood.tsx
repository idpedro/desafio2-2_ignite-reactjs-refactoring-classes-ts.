import { useCallback, useState } from "react";
import { useContext } from "react";
import { ReactNode } from "react";
import { createContext } from "react";
import ModalEditFood from "../components/ModalEditFood";
import { FoodProps } from "./useFoods";

interface ModalEditFoodContextProps {
  openModal: (food: FoodProps) => void;
  closeModal: () => void;
}
interface ModalEditFoodProviderProps {
  children: ReactNode[] | ReactNode;
}

const ModalEditFoodContext = createContext({} as ModalEditFoodContextProps);

function ModalEditFoodProvider({ children }: ModalEditFoodProviderProps) {
  const [food, setFood] = useState<FoodProps>({} as FoodProps);
  const [isOpen, setIsOpen] = useState(false);

  const handlerCloseModal = useCallback(() => {
    setFood({} as FoodProps);
    setIsOpen(false);
  }, []);

  const handlerOpenModal = useCallback((food: FoodProps) => {
    setFood(food);
    setIsOpen(true);
  }, []);

  return (
    <ModalEditFoodContext.Provider
      value={{ openModal: handlerOpenModal, closeModal: handlerCloseModal }}
    >
      <ModalEditFood
        isOpen={isOpen}
        onRequestClose={handlerCloseModal}
        food={food}
      />
      {children}
    </ModalEditFoodContext.Provider>
  );
}

const useModalEditFood = () => {
  const context = useContext(ModalEditFoodContext);
  return context;
};

export { ModalEditFoodProvider, useModalEditFood };
