import { Component, Injectable } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/authService';


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
  constructor(private cdr: ChangeDetectorRef, private authService: AuthService){
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

  ngOnInit(): void {
    // Exemplo de como obter e usar o token armazenado
    const tokenData = this.authService.getToken();
    const name = tokenData.user.name;
    this.user.name = this.userName(name);

    if (tokenData && this.authService.isTokenValid()) {
      console.log('Token válido:', tokenData);
      // Faça o que for necessário com o token válido
    } else {
      // Redirecione para a tela de login ou tome outras ações apropriadas
      console.log('Token inválido. Redirecionando para a tela de login.');
    }
  }
  
  userName( name: string){
    const fullName = name;

    // Divida o nome completo nos espaços em branco
    const nameParts = fullName.split(' ');

    // Obtenha o primeiro e segundo nome
    const firstName = nameParts[0];
    return firstName;
  }
}
