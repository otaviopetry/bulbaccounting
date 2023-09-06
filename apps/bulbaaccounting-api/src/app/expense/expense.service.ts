import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseTransaction } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(ExpenseTransaction)
        private expenseRepository: Repository<ExpenseTransaction>,
    ) {
        //
    }

    async create(createExpenseDto: CreateExpenseDto) {
        const expense = this.expenseRepository.create(createExpenseDto);

        expense.value = expense.value / 100;
        expense.transactionItems.forEach((item) => {
            item.value = item.value / 100;
        })

        await this.expenseRepository.save(expense);

        return expense;
    }

    findAll() {
        return `This action returns all expense`;
    }

    findOne(id: number) {
        return `This action returns a #${id} expense`;
    }

    update(id: number, updateExpenseDto: UpdateExpenseDto) {
        return `This action updates a #${id} expense`;
    }

    remove(id: number) {
        return `This action removes a #${id} expense`;
    }
}
