import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '../model/Customer';
import { CustomerService } from '../customer-service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEdit } from '../customer-edit/customer-edit';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
  selector: 'app-customer-list',
  imports: [
          MatButtonModule,
          MatIconModule,
          MatTableModule,
          CommonModule
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList {

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
  ){}

    ngOnInit(): void {
      this.customerService.getCustomers().subscribe(
            customers => this.dataSource.data = customers
        );
    }

    createCustomer() {    
    const dialogRef = this.dialog.open(CustomerEdit, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  } 

  editCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(CustomerEdit, {
      data: { customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCustomer(customer: Customer) {    
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: { title: "Eliminar customer", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.deleteCustomer(customer.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  


}
