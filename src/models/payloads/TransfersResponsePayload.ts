import { CategoryDTO } from "../dtos";

export type TransfersResponsePayload = {
  id?: number;
  amount: number;
  type: "RECEITA" | "DESPESA";
  date: string;
  categoryId: number;
  category?: CategoryDTO;
  attachments?: string;
};
