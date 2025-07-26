import { CategoryDTO } from "./CategoryDTO";

export type TransactionDTO = {
  id: number;
  type: string;
  amount: number;
  category: CategoryDTO;
  date: Date;
};
