import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'userData';

  setToken(userData: any): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(userData));
  }

  getToken(): any | null {
    const userData = localStorage.getItem(this.tokenKey);
    return userData ? JSON.parse(userData) : null;
  }

  getExpirationTime(): number | null {
    const userData = this.getToken();
    return userData ? userData.expirationTime : null;
  }

  isTokenValid(){
    const expirationTime = this.getExpirationTime();
    return expirationTime && expirationTime > Math.floor(Date.now() / 1000);
  }

  // Adicione mais métodos conforme necessário para manipular o token, como logout, etc.
}
