import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation'; 
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { Rental } from '../model/Rental';
import { Pageable } from '../../core/model/page/Pageable';
import { RentalService } from '../rental-service';
import { RentalEdit } from '../rental-edit/rental-edit';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from "@angular/material/datepicker";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rental-list',
  imports: [MatButtonModule, 
          MatIconModule, 
          MatTableModule, 
          CommonModule, 
          MatPaginator, 
          MatDatepickerInput, 
          MatFormField, 
          MatLabel, 
          MatDatepickerToggle, 
          MatDatepicker,
          FormsModule,
          MatNativeDateModule,
          MatInputModule],
  templateUrl: './rental-list.html',
  styleUrl: './rental-list.scss',
})
export class RentalList {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Rental>();
  displayedColumns: string[] = ['id', 'title', 'name','startDate','endDate', 'action']

  filterGame: string;
  filterClient: string;
  filterDate: Date;  

  constructor(private rentalService: RentalService, public dialog: MatDialog){}

  ngOnInit(): void{
    this.loadPage();
  }

  loadPage(event?: PageEvent){
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };
    
    if(event != null){
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }
  
    this.rentalService.getRentals(pageable, this.filterGame, this.filterClient, this.filterDate)
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });

  }

  onSearch(): void {
    this.pageNumber = 0;
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;
    
    this.onSearch();
  }

  createRental(){
    const dialogRef = this.dialog.open(RentalEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editRental(rental : Rental){
    const dialogRef = this.dialog.open(RentalEdit, {
      data: {rental: rental},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  
  deleteRental(rental: Rental){
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: { title: "Eliminar prestamo", message: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?"},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.rentalService.deleteRental(rental.id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}
