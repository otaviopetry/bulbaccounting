import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bulba-remove-expense',
  templateUrl: './remove-expense.component.html',
  styleUrls: ['./remove-expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveExpenseComponent {}
