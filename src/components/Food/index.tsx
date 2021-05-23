import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";

import { FoodProps, useFoods } from "../../Hooks/useFoods";
import { useCallback } from "react";
import { useModalEditFood } from "../../Hooks/useModalEditFood";

interface FoodComponetProps {
  food: FoodProps;
}

function Food({ food }: FoodComponetProps) {
  const { toggleAvailable, deleteFood } = useFoods();
  const { openModal } = useModalEditFood();

  const handlerEditFood = useCallback(() => {
    openModal(food);
  }, [food, openModal]);

  const handlerDeleteFood = useCallback(() => {
    deleteFood(food.id);
  }, [deleteFood, food.id]);
  const handlerToggleAvailable = useCallback(() => {
    toggleAvailable(food.id);
  }, [food.id, toggleAvailable]);

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          <b>
            {new Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(food.price)}
          </b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => {
              handlerEditFood();
            }}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={handlerDeleteFood}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              defaultChecked={food.available}
              onChange={handlerToggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food;
