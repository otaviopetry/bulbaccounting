import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense.routing';
import { ExpenseComponent } from './expense.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { ReactiveFormsModule } from '@angular/forms';

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
})
export class ExpenseModule {}
