import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { User } from '../Models/user';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">;
  usuario: string;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",

    })
  }
  accertp: boolean;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) {
    this.accertp = false;
    if (localStorage.getItem("token")) {
      this.isUserLoggedIn$.next(true);
      this.usuario=this.getDecodedAccessToken(localStorage.getItem("token")).usuario
    }
  }


  signUp(user: Omit<User, "id">): Observable<User> {
    let userW = user;
    console.log(userW);

    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      tap(() => {
        console.log("registrado");
        this.login(userW , userW);
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
          this.router.navigate(["menu"]);
          window.location.reload();
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "id">;
          }>("login")
        )
      );
  }

  getUserById(userId: Pick<User, "id">): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/user/${userId}`, { responseType: "json" }).pipe(
      catchError(this.errorHandlerService.handleError<User[]>("getUserById", []))
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}


