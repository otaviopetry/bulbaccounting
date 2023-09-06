import { ITransactionItem } from "./transaction-item.interface";

export interface IExpense {
    id: string;
    name: string;
    value: number;
    date: Date;
    paymentMethod: 'debit' | 'credit';
    paymentType: 'onePayment' | 'installments';
    installments: number;
    paymentSource: string;
    transactionItems: ITransactionItem[];
    notes?: string;
}
