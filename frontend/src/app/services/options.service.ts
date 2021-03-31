import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Generos } from '../Models/options';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  url = 'http://localhost:3000/options';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",

    })
  }
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
  }
  getGeneros(): Observable<Generos[]> {
    return this.http.get<Generos[]>(`${this.url}/generos`, { responseType: "json" }).pipe(
      catchError(this.errorHandlerService.handleError<Generos[]>("getGeneros", []))
    );
  }
}
