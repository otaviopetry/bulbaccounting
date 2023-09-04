import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTransaction } from './entities/expense.entity';
import { ExpenseItems } from './entities/expense-items.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'test',
            password: 'test',
            database: 'test',
            entities: [ExpenseTransaction, ExpenseItems],
            synchronize: true,
          }),
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService],
})
export class ExpenseModule {}
