import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IExpense } from '@libs/shared-types/expense.interface';
import { ITransactionItem } from '@libs/shared-types/transaction-item.interface';

@Injectable()
export class ExpenseFormService {
    constructor(private httpClient: HttpClient) {
        //
    }

    public addExpense(formData: IExpense) {
        const data = this.prepareData(formData);

        console.log('===> prepared data', data);

        return this.httpClient.post('http://localhost:3000/api/expense', data).subscribe({
            next: (response) => {
                console.log('===> response', response);
            }
        });
    }

    private prepareData(formData: IExpense) {
        const formattedTransactionItems = formData.transactionItems.map(
            (item: ITransactionItem) => {
                return {
                    ...item,
                    value: item.value * 100,
                };
            }
        );
        const total = formattedTransactionItems.reduce(
            (acc, item) => acc + item.value * item.quantity,
            0
        );
        // transform values from expense and from transactionItems into cents before returning the object
        const data = {
            ...formData,
            transactionItems: formattedTransactionItems,
            value: total,
        };

        return data;
    }
}
