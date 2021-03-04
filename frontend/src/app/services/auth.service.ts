import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { User } from '../Models/user';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      
    })
  }
  accertp: boolean;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) { this.accertp=false }


  signUp(user: Omit<User, "id">): Observable<User>{
    let userW= user;
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      tap(() => {
        this.login(userW,userW);
      }),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }

  login(
    usuario: Pick<User, "usuario">,
    contrasena: Pick<User, "contrasena">
  ): Observable<{
    token: string;
    userId: Pick<User, "id">;
  }> {
    return this.http
      .post(`${this.url}/login`, { usuario, contrasena }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<User, "id"> }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["nosotros"]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "id">;
          }>("login")
        )
      );
  }
}


