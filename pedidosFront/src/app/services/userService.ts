import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel'
import { environment } from 'src/environments/environment';
import { UserCommand } from '../models/userCommand';

@Injectable(
)
export class UserService {
  user : string ='';
  private url = environment.api;
  private users = environment.user;
  constructor(private http: HttpClient) { }

   registerUser(name : string, email : string, cpf : string, address : string,  password : string){
    this.user = `${name}/${email}/${cpf}/${address}/${password}`;
    return this.http.post<UserModel>(`${this.url}${this.users}create/${this.user}`,this.user);
  }

  login( cpf : string, password : string){
    this.user = `${cpf}/${password}`;
    return this.http.get<UserCommand>(`${this.url}${this.users}getPassword/${this.user}`)
  }
}
