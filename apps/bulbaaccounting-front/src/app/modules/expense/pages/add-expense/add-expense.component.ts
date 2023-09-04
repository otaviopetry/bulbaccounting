import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'bulba-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseComponent implements OnInit {
    public paymentForm: FormGroup = this.formBuilder.group({});

    constructor(
        private formBuilder: FormBuilder
    ) {
        //
    }

    ngOnInit() {
        this.paymentForm = this.formBuilder.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            totalAmount: ['', Validators.required],
            paymentMethod: ['0', Validators.required],
            paymentType: ['0', Validators.required],
            installments: [1],
            paymentSource: ['', Validators.required],
            transactionItems: this.formBuilder.array([]),
            additionalInfo: ['']
        });
        this.addAdditionalField();
    }

    get transactionItems() {
        return this.paymentForm.get('transactionItems') as FormArray;
    }

    addAdditionalField() {
        this.transactionItems.push(
            this.formBuilder.group({
                name: ['', Validators.required],
                value: ['', Validators.required],
                category: ['', Validators.required],
            })
        );
    }

    onSubmit() {
        console.log('===> form', this.paymentForm.value);
    }
}
