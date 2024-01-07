import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { UserModel } from '../models/userModel'
import { environment } from 'src/environments/environment';
import { UserCommand } from '../models/userCommand';

@Injectable(
)
export class UserService {
  user : string ='';
  private url = environment.api;
  private users = environment.user;
  registrationSuccessful: boolean | undefined;
  constructor(private http: HttpClient) { }

   registerUser(name : string, email : string, cpf : string, address : string,  password : string){
    this.user = `${name}/${email}/${cpf}/${address}/${password}`;
    return this.http.post<UserCommand>(`${this.url}${this.users}create/${this.user}`,this.user);
  }
 
  login( cpf : string, password : string){
    this.user = `${cpf}/${password}`;
    return this.http.get<UserCommand>(`${this.url}${this.users}getPassword/${this.user}`)
  }

  getUserByCpf(cpf:string){
    return this.http.get<UserCommand>(`${this.url}${this.users}getByCpf/${cpf}`)
  }

  
}
