import { CategoryDTO } from "../dtos";
import { TransactionType } from "../enums";
import { Money } from "./Money";

export class Transaction {
  private constructor(
    public readonly id: number,
    public readonly type: TransactionType,
    public readonly amount: Money,
    public readonly date: Date,
    public readonly categoryId: number,
    public readonly category?: CategoryDTO
  ) {}

  public static create(
    id: number,
    type: TransactionType,
    amount: number,
    date: Date,
    category: CategoryDTO
  ): Transaction {
    return new Transaction(id, type, Money.from(amount), date, category.id);
  }

  // Domain methods
  public isExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }

  public isIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  public getSignedAmount(): Money {
    return this.isExpense() ? Money.from(-this.amount.getValue()) : this.amount;
  }
}
