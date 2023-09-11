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

    protected selectedInstallments = 1;

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
            value: [0, Validators.required],
            paymentMethod: ['0', Validators.required],
            paymentType: ['0', Validators.required],
            installments: [1, [Validators.required, Validators.min(1)]],
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

    public getTotalAmount() {
        let total = 0;

        for (const item of this.transactionItems.controls) {
            total += item.value.value * item.value.quantity;
        }

        this.setTotalAmount(total);

        return total.toFixed(2);
    }

    public setTotalAmount(total: number) {
        this.paymentForm.get('value')?.setValue(total);
    }

    public setInstallments() {
        const paymentType: string = this.paymentForm.get('paymentType')?.value;
        const installmentsInput = document.querySelector('input[formcontrolname=installments]');

        if (paymentType !== 'onePayment') {
            this.paymentForm.get('installments')?.setValidators([Validators.required, Validators.min(1)]);
            installmentsInput?.removeAttribute('max');

            return;
        }

        this.selectedInstallments = this.paymentForm.get('installments')?.value;
        this.paymentForm.get('installments')?.setValue(1);
        this.paymentForm.get('installments')?.setValidators([Validators.required, Validators.min(1), Validators.max(1)]);
        installmentsInput?.setAttribute('max', '1');
    }
}
