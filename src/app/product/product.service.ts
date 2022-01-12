import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "https://backend-delinea.herokuapp.com";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private userToken!: string;

  constructor(private httpClient: HttpClient) {
  }



     getAll(): Observable<any> {
      return this.httpClient.get(this.apiURL + '/product/')

      .pipe(
        catchError(this.errorHandler)
      )
    }


    create(product:Product): Observable<any> {

      return this.httpClient.post(this.apiURL + '/product/', JSON.stringify(product), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
    }


    find(id:number): Observable<any> {

      return this.httpClient.get(this.apiURL + '/product/' + id)

      .pipe(
        catchError(this.errorHandler)
      )
    }


    update(id:number, product:Product): Observable<any> {

      return this.httpClient.put(this.apiURL + '/product/' + id, JSON.stringify(product), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
    }


    delete(id:number){
      return this.httpClient.delete(this.apiURL + '/product/' + id, this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
    }


    errorHandler(error:any) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
   }

}
