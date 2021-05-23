import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api from "../services/api";

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface FoodFormData extends Omit<FoodProps, "id" | "available"> {
  id?: number;
}

interface FoodContextProps {
  foods: FoodProps[];
  addFood: (food: FoodFormData) => Promise<void>;
  updateFood: (food: FoodFormData) => Promise<void>;
  deleteFood: (foodId: number) => void;
  toggleAvailable: (foodId: number) => void;
}

interface FoodProviderProps {
  children: ReactNode[];
}

const FoodContext = createContext<FoodContextProps>({} as FoodContextProps);

function FoodProvider({ children }: FoodProviderProps) {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    const getfood = async () => {
      try {
        const response = await api.get("/foods");
        const { data } = response;
        data && setFoods(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getfood();
  }, []);

  const addFood = useCallback(
    async (food: FoodFormData) => {
      try {
        const response = await api.post("/foods", { ...food, available: true });
        const { data } = response;
        const updateFood = [...foods];
        updateFood.push(data);
        setFoods(updateFood);
      } catch (error) {
        console.log(error.message);
      }
    },
    [foods]
  );
  const deleteFood = useCallback(
    async (foodId: number) => {
      try {
        const foodExist = foods.find((food) => food.id === foodId);
        if (foodExist) {
          const respose = await api.delete(`/foods/${foodId}`);
          const { data } = respose;
          if (data) {
            const updatedFoods = foods.filter((food) => food.id !== foodId);
            setFoods(updatedFoods);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [foods]
  );

  const updateFood = useCallback(
    async (food: FoodFormData) => {
      try {
        const respose = await api.put(`/foods/${food.id}`, food);
        const { data, status } = respose;
        if (data && status === 200) {
          const updateFoods = [...foods];
          const foodIndex = updateFoods.findIndex(
            (foodInList) => foodInList.id === food.id
          );
          if (updateFoods[foodIndex]) updateFoods[foodIndex] = data;
          setFoods(updateFoods);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [foods]
  );

  const toggleAvailable = useCallback(
    async (foodId: number) => {
      try {
        const updatedFoods = [...foods];
        const food = updatedFoods.find((food) => food.id === foodId);
        if (food) food.available = !food?.available;
        const respose = await api.put(`/foods/${foodId}`, food);
        const { status } = respose;
        if (status === 200) setFoods(updatedFoods);
      } catch (error) {
        console.log(error.message);
      }
    },
    [foods]
  );

  return (
    <FoodContext.Provider
      value={{ foods, addFood, updateFood, deleteFood, toggleAvailable }}
    >
      {children}
    </FoodContext.Provider>
  );
}

function useFoods() {
  const context = useContext(FoodContext);
  return context;
}
export { FoodProvider, useFoods };
export type { FoodProps, FoodFormData };
