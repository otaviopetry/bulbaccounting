import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { RemoveExpenseComponent } from './pages/remove-expense/remove-expense.component';
import { EditExpenseComponent } from './pages/edit-expense/edit-expense.component';

const routes: Routes = [
  { path: '', component: ExpenseComponent },
  { path: 'add', component: AddExpenseComponent },
  { path: 'remove', component: RemoveExpenseComponent },
  { path: 'edit', component: EditExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
