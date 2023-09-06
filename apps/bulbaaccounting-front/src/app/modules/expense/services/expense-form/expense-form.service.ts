import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IExpense } from '@libs/shared-types/expense.interface'
import { ITransactionItem } from '@libs/shared-types/transaction-item.interface';

@Injectable()
export class ExpenseFormService {
  constructor(
    private httpClient: HttpClient,
  ) {
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
    formData.value = formData.value * 100;
    formData.transactionItems.forEach((item: ITransactionItem) => {
      item.value = item.value * 100;
    });

    return formData;
  }
}
