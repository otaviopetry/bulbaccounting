import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { ExpenseTransaction } from './expense.entity';

  @Entity()
  export class ExpenseItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    value: number;

    @Column()
    category: string;

    @ManyToOne(() => ExpenseTransaction, (expense) => expense.transactionItems)
    transaction: ExpenseTransaction;
  }
