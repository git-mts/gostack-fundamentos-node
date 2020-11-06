import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce(
      (ammount: Balance, transaction) => {
        if (transaction.type === 'income') ammount.income += transaction.value;
        if (transaction.type === 'outcome')
          ammount.outcome += transaction.value;

        ammount.total = ammount.income - ammount.outcome;

        return ammount;
      },
      initialBalance,
    );

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
