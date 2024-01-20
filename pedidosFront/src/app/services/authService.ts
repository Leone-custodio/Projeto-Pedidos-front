import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel = {
    name: '',
    email: '',
    cpf: '',
    address: '',
    password: ''
  };

  private readonly tokenKey = 'userData';
  private readonly orderKey = 'orderData';

  constructor(private router: Router ){}

  getToken(): any | null {
    const userData = localStorage.getItem(this.tokenKey);
    return userData ? JSON.parse(userData) : null;
  }
  getOrderToken(): any | null {
    const orderData = localStorage.getItem(this.orderKey);
    return orderData ? JSON.parse(orderData) : null;
  }

  getExpirationTime(): number | null {
    const userData = this.getToken();
    return userData ? userData.expirationTime : null;
  }

  isTokenValid(){
    const expirationTime = this.getExpirationTime();
    return expirationTime && expirationTime > Math.floor(Date.now() / 1000);
  }

  getTokenUser(): void {
    const tokenData = this.getToken();
    this.user.name = tokenData.user.name;
    this.user.cpf = tokenData.user.cpf;
    this.user.email = tokenData.user.email;
    this.user.address = tokenData.user.address;

    if (tokenData && this.isTokenValid()) {
      console.log('Token válido:', tokenData);
      
      return tokenData;
    } 
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
}
