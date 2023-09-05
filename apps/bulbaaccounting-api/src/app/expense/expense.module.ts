import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTransaction } from './entities/expense.entity';
import { ExpenseItems } from './entities/expense-items.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ExpenseTransaction,
            ExpenseItems
        ])
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService],
})
export class ExpenseModule {}

