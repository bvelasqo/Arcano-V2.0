import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Game } from '../Models/game';
import { Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Salas } from '../Models/salas';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = 'http://localhost:3000/game';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"

    })
  }
  anfitrion: any;
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    this.anfitrion = this.getDecodedAccessToken(localStorage.getItem("token")).userId
  }
  saveGame(game: Omit<Game, "id">): Observable<Game> {
    game.anfitrion = this.anfitrion
    console.log(game);
    return this.http.post<Game>(`${this.url}/gamesave`, game, this.httpOptions).pipe(
      first(),
      tap(() => {
        console.log("Guardado");
      }),
      catchError(this.errorHandlerService.handleError<Game>("gamesave"))
    );
  }
  saveRoom(room: Omit<Salas, "id">): Observable<Salas> {
    return this.http.post<Salas>(`${this.url}/saverooms`, room, this.httpOptions).pipe(
      first(),
      tap(() => {
        console.log("Guardado");
      }),
      catchError(this.errorHandlerService.handleError<Salas>("gamesave"))
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
