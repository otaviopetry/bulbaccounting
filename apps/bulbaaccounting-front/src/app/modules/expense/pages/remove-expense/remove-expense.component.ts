import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rocky-pear-remove-expense',
  templateUrl: './remove-expense.component.html',
  styleUrls: ['./remove-expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveExpenseComponent {}
