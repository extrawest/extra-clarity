import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NumericFieldValidators} from "../../../projects/extra-clarity/numeric-field";

const HTML_EXAMPLE = `
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
</form>
`;

const HTML_EXAMPLE2 = `
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
</form>
`;

const HTML_EXAMPLE3 = `
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
</form>
`;

const HTML_EXAMPLE4 = `
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
</form>
`;

@Component({
  selector: 'storybook-numeric-field',
  templateUrl: './numeric-field.component.html',
})
export class NumericFieldStoryComponent {htmlExample = HTML_EXAMPLE;
  htmlExample2 = HTML_EXAMPLE2;
  htmlExample3 = HTML_EXAMPLE3;
  htmlExample4 = HTML_EXAMPLE4;

  moneyTemplate: number;
  percentageTemplate: number;

  exampleForm = new FormGroup({
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

  exampleForm2 = new FormGroup({
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

  usageForm = new FormGroup({
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
