import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rocky-pear-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent {}
