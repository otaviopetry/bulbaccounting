import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bulba-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent implements OnInit {
  public paymentForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paymentMethod: ['0', Validators.required],
      paymentType: ['0', Validators.required],
      paymentSource: ['', Validators.required],
      additionalFields: this.fb.array([])
    });
    this.addAdditionalField();
  }

  get additionalFields() {
    return this.paymentForm.get('additionalFields') as FormArray;
  }

  addAdditionalField() {
    this.additionalFields.push(this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      category: ['', Validators.required]
    }));
  }

  onSubmit() {
    console.log('===> form', this.paymentForm.value)
  }
}
