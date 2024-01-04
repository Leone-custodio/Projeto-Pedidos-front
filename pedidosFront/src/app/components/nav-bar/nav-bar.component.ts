import { Component, Injectable } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
@Injectable(
  )

export class NavBarComponent {
    checkNavBar: boolean = false;
    user: UserModel = {
      name: '',
      email: '',
      cpf: '',
      address: '',
      password: ''
    };
    data : boolean = false;
  constructor(private cdr: ChangeDetectorRef){
    this.getUserLocalStorage();
  }
  check(): boolean{
    if(this.checkNavBar == true){
     return this.checkNavBar = false;
    }
    return this.checkNavBar = true;
  } 
  // perssiste os dados do usuário após o login
  getUserLocalStorage(){
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.data = true;
      console.log('Dados do Usuário:', userData);
      
    }
  }

  // logout.component.ts ou serviço de logout
  logout(){
    localStorage.removeItem('userData');
    this.cdr.detectChanges();
    this.data = false;
  }
}
