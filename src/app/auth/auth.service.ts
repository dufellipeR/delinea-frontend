import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Reply } from './reply';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = "https://backend-delinea.herokuapp.com/auth/login/";
  private loggedUserSubject!: BehaviorSubject<Reply>;
  public loggedInUser!: Observable<any>;

  constructor(private http: HttpClient) { }



  loginUser(user: User) {
    return this.http.post<Reply>(`${this.baseUrl}/`, user)
        .pipe(map(response=> {
            localStorage.setItem('loggedInUser', JSON.stringify(response.tokens.access));
            this.loggedUserSubject.next(response);
            console.log(response);
            return response;
        }));
  }

  logoutUser() {
      localStorage.removeItem('loggedInUser');
      this.loggedUserSubject.next({ email: '', username: '' , tokens: {
        access: '',
        refresh: '',
      }});
  }

  public get loggedInUserValue(){
      return this.loggedUserSubject.value;
  }

}
