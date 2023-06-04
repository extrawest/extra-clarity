import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClrInputModule } from '@clr/angular';

import { NumericFieldModule, NumericFieldValidators } from '../../../../projects/extra-clarity/numeric-field';

const CODE_EXAMPLES: readonly string[] = [
`
<form clrForm clrLayout="vertical" [formGroup]="exampleForm">
    <clr-input-container>
        <label>Money</label>
        <input clrInput ecNumeric
               type="text"
               formControlName="money"
               [unit]="'€'"
               [autofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput ecNumeric
               type="text"
               formControlName="percentage"
               [unit]="'%'"
               [decimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>`,
`
<form clrForm>
    <clr-input-container>
        <label>Money</label>
        <input clrInput ecNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               [unit]="'€'"
               [(ngModel)]="money"
               [autofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput ecNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               [unit]="'%'"
               [(ngModel)]="percentage"
               [decimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>`,
`
<form clrForm>
    <clr-input-container>
        <label>Money</label>
        <input clrInput ecNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               [unit]="'€'"
               [unitPosition]="'left'"
               [autofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
</form>`,
`
<form clrForm [formGroup]="exampleForm2">
    <clr-input-container>
        <label>Rounded Value</label>
        <input clrInput ecNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               formControlName="money1"
               [unit]="'€'"
               [roundValue]="true"
               [autofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Original Value</label>
        <input clrInput ecNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               formControlName="money2"
               [unit]="'€'"
               [decimalPlaces]="5"
               [autofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>`,
];

@Component({
  selector: 'ec-storybook-numeric-field',
  templateUrl: './numeric-field-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ClrInputModule,
    NumericFieldModule,
  ],
})
export class NumericFieldDemoComponent {
  protected codeExamples = CODE_EXAMPLES;

  protected moneyTemplate: number;
  protected percentageTemplate: number;

  protected exampleForm = new FormGroup({
    money: new FormControl<number | undefined>(undefined, {
      validators: [
        NumericFieldValidators.min(0, '.', ','),
        NumericFieldValidators.max(10000, '.', ','),
        Validators.required,
      ],
      updateOn: 'blur',
    }),
    percentage: new FormControl<number | undefined>(undefined, {
      validators: [
        NumericFieldValidators.min(0, '.', ','),
        NumericFieldValidators.max(100, '.', ','),
        Validators.required,
      ],
      updateOn: 'blur',
    }),
  });

  protected exampleForm2 = new FormGroup({
    money1: new FormControl(89.99999, {
      validators: [
        NumericFieldValidators.min(0, '.', ','),
        NumericFieldValidators.max(100, '.', ','),
        Validators.required,
      ],
      updateOn: 'blur',
    }),
    money2: new FormControl(89.99999, {
      validators: [
        NumericFieldValidators.min(0, '.', ','),
        NumericFieldValidators.max(100, '.', ','),
        Validators.required,
      ],
      updateOn: 'blur',
    }),
  });

  protected usageForm = new FormGroup({
    money: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    weight: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    emission: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    kilometres: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    cubic: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    millimetres: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    kilowatt: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    timeunit: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    horsepower: new FormControl<number | undefined>(undefined, {
      validators: [NumericFieldValidators.min(0, '.', ','), Validators.required],
      updateOn: 'blur',
    }),
    percentage: new FormControl<number | undefined>(undefined, {
      validators: [
        NumericFieldValidators.min(0, '.', ','),
        NumericFieldValidators.max(100, '.', ','),
        Validators.required,
      ],
      updateOn: 'blur',
    }),
  });
}
