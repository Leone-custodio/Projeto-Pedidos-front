import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent {
  user: UserModel = {
    name: '',
    email: '',
    cpf: '',
    address: '',
    password: ''
  };

  constructor( private authService: AuthService, private router: Router ){
    this.getTokenUser()
  }
  
  logout(): void {
    const confirmLogout = window.confirm('Tem certeza de que deseja sair ?');

    if (confirmLogout) {
      localStorage.removeItem('userData');
      localStorage.removeItem('orderData');

      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    }
  }

  getTokenUser(): void {
    const tokenData = this.authService.getToken();
    this.user.name = tokenData.user.name;
    this.user.cpf = tokenData.user.cpf;
    this.user.email = tokenData.user.email;
    this.user.address = tokenData.user.address;

    if (tokenData && this.authService.isTokenValid()) {
      console.log('Token válido:', tokenData);
    } 
  }
}
