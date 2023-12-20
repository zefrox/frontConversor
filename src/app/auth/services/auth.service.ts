import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<string|null>(null);
  private _currentUserRole = signal<string|null>(null);
  private _isAdmin = signal<boolean|null>(null);


  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );
  public currentUserRole = computed( () => this._currentUserRole() );
  public isAdmin = computed( () => this._isAdmin() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token:string): boolean {
  console.log('🚀 ~ token:', token)
  console.log('🚀 ~ user:', user)
    const isAdmin = user.role === 'admin' 
    this._currentUser.set( user.username.toUpperCase() );
    this._isAdmin.set( isAdmin );
    this._currentUserRole.set( user.role );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }


  login( username: string, password: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/v1/login`;
    const body = { username, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  checkAuthStatus():Observable<boolean> {
    const url   = `${ this.baseUrl }/conversor/v1`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token }) => this.setAuthentication( user, token )),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );


  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );

  }


}
