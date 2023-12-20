import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, IConversorResponse, IHistoricResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentHistotic = signal<IHistoricResponse[]|null>(null);
  private _currentConvertion = signal<IConversorResponse|null>(null);

  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentConvertion = computed( () => this._currentConvertion() );
  public authStatus = computed( () => this._authStatus() );
  public currentHistotic = computed( () => this._currentHistotic() );


  constructor() {}

  private setDataConversor(convetionAmount: number, UFValue: number,convertionDate: string,amount: number): boolean {
    const data: IConversorResponse = {
      convetionAmount,
      UFValue,convertionDate,amount
    }
    this._currentConvertion.set(data);
    return true;
  }
  private setDataHistoric(data: IHistoricResponse[]): boolean {
    this._currentHistotic.set(data);
    return true;
  }


  conversor(ufQuantity: string, dateConversor: string ):Observable<boolean> {
    const url   = `${ this.baseUrl }/conversor/v1`;
    const token = localStorage.getItem('token');
    const body = { ufQuantity, dateConversor };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);
      return this.http.post<any>(url, body, { headers })
        .pipe(
          map( ({convetionAmount, UFValue, convertionDate, amount }) => this.setDataConversor(convetionAmount, UFValue, convertionDate, amount )),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );
  }

  getHistoric():Observable<boolean> {
    const url   = `${ this.baseUrl }/conversor/v1`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);
      return this.http.get<IHistoricResponse[]>(url, { headers })
        .pipe(
          map( (response) => this.setDataHistoric(response)),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );
  }
}
