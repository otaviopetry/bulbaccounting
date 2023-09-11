import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseFormService } from '../../services/expense-form/expense-form.service';

@Component({
    selector: 'bulba-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent implements OnInit {
    public paymentForm: FormGroup = this.formBuilder.group({ });

    constructor(
        private formBuilder: FormBuilder,
        private expenseFormService: ExpenseFormService,
    ) {
        //
    }

    ngOnInit() {
        this.paymentForm = this.formBuilder.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            value: ['', Validators.required],
            paymentMethod: ['0', Validators.required],
            paymentType: ['0', Validators.required],
            installments: [1],
            paymentSource: ['', Validators.required],
            transactionItems: this.formBuilder.array([]),
            notes: ['']
        });
        this.addAdditionalField();
    }

    get transactionItems() {
        return this.paymentForm.get('transactionItems') as FormArray;
    }

    public addAdditionalField() {
        this.transactionItems.push(
            this.formBuilder.group({
                name: ['', Validators.required],
                value: [null, Validators.required],
                quantity: [null, Validators.required],
                category: ['', Validators.required],
            })
        );
    }

    public onSubmit() {
        this.expenseFormService.addExpense(this.paymentForm.value);
    }

    public isFieldInvalid(controlName: string) {
        return this.paymentForm.get(controlName)?.invalid &&
            this.paymentForm.get(controlName)?.touched;
    }

    public isFormValid() {
        return this.paymentForm.valid;
    }
}
