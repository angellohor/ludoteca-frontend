import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentalPage } from './model/RentalPage';
import { Observable } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Rental } from './model/Rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/rental';

  getRentals(pageable: Pageable, title?: string, customerName?: string, date?: Date): Observable<RentalPage> {
    let dateStr = null;
    if (date != null) {
      dateStr = date.toISOString().split('T')[0];
    }

    return this.http.post<RentalPage>(this.baseUrl, {
      gameTitle: title,              
      customerName: customerName, 
      date: dateStr,              
      pageable: pageable
    });  
  }

  saveRental(rental: Rental): Observable<Rental> {
    const { id } = rental;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Rental>(url, rental);
  }

  deleteRental(idRental: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idRental}`);
  }

  getAllRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.baseUrl);
  }
}
