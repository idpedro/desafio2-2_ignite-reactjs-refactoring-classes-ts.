import Input from "../Input";
import { Form } from "./styles";
import { FormHandles } from "@unform/core";

import { FiCheckSquare } from "react-icons/fi";
import { FoodFormData, useFoods, FoodProps } from "../../Hooks/useFoods";
import { useCallback, useRef } from "react";

interface formFoodProps {
  title: string;
  submitText: string;
  food?: FoodProps;
  afterSubmitCallback?: () => void;
}

function FormFood({
  title,
  submitText,
  food,
  afterSubmitCallback,
}: formFoodProps) {
  const { addFood, updateFood } = useFoods();

  const form = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    (foodInForm: FoodFormData) => {
      if (!food) addFood(foodInForm);
      else
        form.current &&
          updateFood({
            ...form.current.getData(),
            id: food.id,
            available: food.available,
          } as FoodProps);
      afterSubmitCallback && afterSubmitCallback();
    },
    [addFood, afterSubmitCallback, food, updateFood]
  );

  return (
    <Form ref={form} onSubmit={handleSubmit} initialData={food ? food : {}}>
      <h1>{title}</h1>
      <Input name="image" placeholder="Cole o link aqui" />

      <Input name="name" placeholder="Ex: Moda Italiana" />
      <Input name="price" placeholder="Ex: 19.90" />

      <Input name="description" placeholder="Descrição" />
      <button type="submit" data-testid="add-food-button">
        <p className="text">{submitText}</p>
        <div className="icon">
          <FiCheckSquare size={24} />
        </div>
      </button>
    </Form>
  );
}

export default FormFood;
