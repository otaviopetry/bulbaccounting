import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExpenseTransaction } from './expense.entity';
import { ITransactionItem } from '@libs/shared-types/transaction-item.interface';

@Entity()
export class ExpenseItems implements ITransactionItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    value: number;

    @Column('int')
    quantity: number;

    @Column()
    category: string;

    @ManyToOne(() => ExpenseTransaction, (expense) => expense.transactionItems)
    transaction: ExpenseTransaction;
}
