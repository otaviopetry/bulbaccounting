import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Generated,
} from 'typeorm';
import { ExpenseItems } from './expense-items.entity';

import { IExpense } from '@libs/shared-types/expense.interface';

@Entity()
export class ExpenseTransaction implements IExpense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('increment')
    transactionNumber: number;

    @Column()
    name: string;

    @Column('decimal')
    value: number;

    @Column('date')
    date: Date;

    @Column()
    paymentMethod: 'debit' | 'credit';

    @Column()
    paymentType: 'onePayment' | 'installments';

    @Column('int')
    installments: number;

    @Column()
    paymentSource: string;

    @Column({ nullable: true })
    notes: string;

    @OneToMany(() => ExpenseItems, (expenseItems) => expenseItems.transaction, {
        cascade: true,
    })
    transactionItems: ExpenseItems[];
}
