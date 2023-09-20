import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ExpenseRoutingModule } from './expense.routing';
import { ExpenseComponent } from './expense.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseFormService } from './services/expense-form/expense-form.service';

@NgModule({
  declarations: [
    ExpenseComponent,
    AddExpenseComponent,
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ExpenseFormService,
    CurrencyPipe,
  ]
})
export class ExpenseModule {}
