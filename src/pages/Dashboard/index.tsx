import { useCallback } from "react";
import { useState } from "react";
import { useFoods } from "../../Hooks/useFoods";
import { ModalEditFoodProvider } from "../../Hooks/useModalEditFood";

import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import Food from "../../components/Food";

import { FoodsContainer } from "./styles";

function Dashboard() {
  const { foods } = useFoods();
  const [modalAddFoodIsOpen, setModalAddFoodIsOpen] = useState(false);

  const handlerOpenAddFoodModal = useCallback(() => {
    setModalAddFoodIsOpen(true);
  }, []);
  const handlerCloseAddFoodModal = useCallback(() => {
    setModalAddFoodIsOpen(false);
  }, []);

  return (
    <>
      <Header openModal={handlerOpenAddFoodModal} />
      <ModalAddFood
        isOpen={modalAddFoodIsOpen}
        onRequestClose={handlerCloseAddFoodModal}
      />

      <FoodsContainer data-testid="foods-list">
        <ModalEditFoodProvider>
          {foods && foods.map((food) => <Food key={food.id} food={food} />)}
        </ModalEditFoodProvider>
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
