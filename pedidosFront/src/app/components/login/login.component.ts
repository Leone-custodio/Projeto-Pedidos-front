
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/userService'; 
import { UserModel } from '../../models/userModel';
import { UserCommand } from '../../models/userCommand';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  user: UserModel = {
    name: '',
    email: '',
    cpf: '',
    address: '',
    password: ''
  };
  loading: boolean = false;

  resultView: UserCommand = new UserCommand;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef ) { }
 
  loginUser(cpf: string, password: string) {
    this.loading = true; // Ativar o loading
    
    this.userService.login(cpf, password).subscribe(resultView => {
      this.resultView = resultView;
      
      if (this.resultView.success) {
        const expirationTime = this.calculateExpirationTime();
        const userData: UserCommand = {
          success: this.resultView.success,
          message: this.resultView.message,
          user: this.resultView.user,
          expirationTime: expirationTime
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
        
        this.showSuccessAlert(this.resultView.message);
        
      } else {
        this.showErrorAlert(this.resultView.message);
      }
      
      this.loading = false; // Desativar o loading
      location.reload();
    });
  }
  
 
  calculateExpirationTime(): number {
    const expiresInMinutes = 1;
    const expirationTimeInSeconds = new Date().getTime() + expiresInMinutes * 1000;
    return Math.floor(expirationTimeInSeconds / 1000);
  }

  showSuccessAlert(message: string) {
   
    window.alert(`Success: ${message}`);
  }
  
  showErrorAlert(message: string) {
    
    window.alert(`Error: ${message}`);
  }
  
}
