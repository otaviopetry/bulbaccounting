import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ExpenseItems } from './expense-items.entity';

@Entity()
export class ExpenseTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  value: number;

  @Column('date')
  date: Date;

  @Column()
  paymentMethod: string;

  @Column()
  paymentType: string;

  @Column()
  paymentSource: string;

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => ExpenseItems, (expenseItems) => expenseItems.transaction)
  transactionItems: ExpenseItems[];
}
