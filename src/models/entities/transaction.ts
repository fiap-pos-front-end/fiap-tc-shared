import { TransactionType } from "../enums/transaction-type";
import { Category } from "./category";

export interface Transaction {
  id: number;
  type: TransactionType;
  date: Date;
  amount: number;
  attachments: string;
  categoryId: number;
  userId: number;
  category?: Category;
}
