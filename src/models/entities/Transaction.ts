import { CategoryDTO } from '../dtos';
import { TransactionType } from '../enums';
import { Money } from './Money';

export class Transaction {
  private constructor(
    public readonly id: string,
    public readonly type: TransactionType,
    public readonly amount: Money,
    public readonly date: Date,
    public readonly categoryId: string,
    public readonly category?: string
  ) {}

  public static create(id: string, type: TransactionType, amount: number, date: Date, category: string): Transaction {
    return new Transaction(id, type, Money.from(amount), date, category);
  }

  public static appendCategory(transaction: Transaction, categoryId: string, categories: CategoryDTO[]): Transaction {
    const category = categories.find((c) => c.id === parseInt(categoryId));

    return new Transaction(
      transaction.id,
      transaction.type,
      transaction.amount,
      transaction.date,
      transaction.categoryId,
      category?.name
    );
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
