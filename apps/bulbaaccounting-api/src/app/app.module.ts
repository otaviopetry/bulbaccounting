import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTransaction } from './expense/entities/expense.entity';
import { ExpenseItems } from './expense/entities/expense-items.entity';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'otaviopetry',
      password: '123456',
      database: 'test',
      entities: [
        ExpenseTransaction,
        ExpenseItems,
      ],
      synchronize: true,
    }),
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
