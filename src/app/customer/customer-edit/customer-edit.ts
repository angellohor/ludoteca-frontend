import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../customer-service';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-customer-edit',
  imports: [FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule ],
  templateUrl: './customer-edit.html',
  styleUrl: './customer-edit.scss',
})
export class CustomerEdit {
      customer: Customer;

    constructor(
        public dialogRef: MatDialogRef<CustomerEdit>,
        @Inject(MAT_DIALOG_DATA) public data: {customer : Customer},
        private customerService: CustomerService
    ) {}

    ngOnInit(): void {
        this.customer = this.data.customer ? Object.assign({}, this.data.customer) : new Customer();
    }

    onSave() {
        this.customerService.saveCustomer(this.customer).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
