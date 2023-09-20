import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseFormService } from '../../services/expense-form/expense-form.service';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'bulba-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AddExpenseComponent implements OnInit {
    public paymentForm: FormGroup = this.formBuilder.group({ });

    protected selectedInstallments = 1;

    constructor(
        private formBuilder: FormBuilder,
        private expenseFormService: ExpenseFormService,
        private currencyPipe: CurrencyPipe,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        //
    }

    ngOnInit() {
        this.paymentForm = this.formBuilder.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            value: [{ value: '0.00', disabled: true}, Validators.required],
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
                value: [0, Validators.required],
                quantity: [1, Validators.required],
                category: ['', Validators.required],
            })
        );
    }

    public onSubmit() {
        this.expenseFormService.addExpense({
            ...this.paymentForm.value,
        });
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

        total = total / 100;

        return total.toFixed(2);
    }

    public formatTransactionItemValue(index: number) {
        this.transactionItems.controls[index].get('value')?.setValue(
            parseFloat(this.transactionItems.controls[index].get('value')?.value).toFixed(2).replace(',', '.')
        );
    }

    public setInstallments() {
        const paymentType: string = this.paymentForm.get('paymentType')?.value;
        const installmentsInput = document.querySelector('input[formcontrolname=installments]');

        if (paymentType !== 'onePayment') {
            this.paymentForm.get('installments')?.setValidators([Validators.required, Validators.min(2)]);
            this.paymentForm.get('installments')?.setValue(2);
            installmentsInput?.removeAttribute('max');
            installmentsInput?.setAttribute('min', '2');
            this.paymentForm.get('installments')?.updateValueAndValidity();

            return;
        }

        this.selectedInstallments = this.paymentForm.get('installments')?.value;
        this.paymentForm.get('installments')?.setValue(1);
        this.paymentForm.get('installments')?.setValidators([Validators.required, Validators.min(1), Validators.max(1)]);
        installmentsInput?.setAttribute('max', '1');
        this.paymentForm.get('installments')?.updateValueAndValidity();
    }

    public getTransactionItemFormattedValue(index: number) {
        const value = this.transactionItems.controls[index].get('value')?.value;
        const decimalValue = value / 100;
        const formattedValue = decimalValue.toFixed(2).replace(',', '.');
        console.log('===> value', value);

        return formattedValue;
    }
}
