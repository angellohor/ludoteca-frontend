import { Component, Inject, OnInit } from '@angular/core';
import { Rental } from '../model/Rental';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RentalService } from '../rental-service';
import { GameService } from '../../game/gameService';
import { CustomerService } from '../../customer/customer-service';
import { Game } from '../../game/model/Game';
import { Customer } from '../../customer/model/Customer';


@Component({
  selector: 'app-rental-edit',
  imports: [FormsModule, 
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatLabel,
        MatInputModule, 
        MatInput,
        MatButtonModule, 
        MatSelectModule, 
        MatDatepickerModule, 
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatNativeDateModule],
  templateUrl: './rental-edit.html',
  styleUrl: './rental-edit.scss',
})
export class RentalEdit implements OnInit{
  rental: Rental;
  games: Game[];
  customers: Customer[];

  constructor(
    public dialogRef: MatDialogRef<RentalEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rentalService: RentalService,
    private gameService: GameService,
    private customerService: CustomerService
  ){}

  ngOnInit(): void {
    this.rental = this.data.rental ? Object.assign({}, this.data.rental) : new Rental();
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
      if (this.rental.game != null){
        const gameFilter: Game[] = games.filter(
          (game) => game.id == this.data.rental.game.id
        );
        if (gameFilter != null){
          this.rental.game = gameFilter[0];
        }
      }
    });

    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;

      if (this.rental.customer != null) {
        const customerFilter: Customer[] = customers.filter(
          (customer) => customer.id == this.data.rental.customer.id
        );
        if (customerFilter != null) {
          this.rental.customer = customerFilter[0];
        }
      }
    });
  }
  
  onSave(){

    if (this.rental.startDate && this.rental.endDate){
      const diffDays = (this.rental.endDate.getTime() - this.rental.startDate.getTime()) / (1000 * 3600 * 24);
      if (diffDays > 14){
        alert('El periodo de préstamo no puede ser mayor a 14 días');
        return;
      }
    }
    this.rentalService.saveRental(this.rental).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onClose(){
    this.dialogRef.close();
  }
}
