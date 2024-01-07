
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
    this.loading = true;
    
    this.userService.login(cpf, password).subscribe(resultView => {
      this.resultView = resultView;
      
      localStorage.removeItem('userData');

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
        
        window.alert(this.resultView.message);
        
      } else {
        window.alert(this.resultView.message);
      }
      
      this.loading = false; 
      window.location.reload();
    });
  }
 
  calculateExpirationTime(): number {
    const expiresInMinutes = 1;
    const expirationTimeInSeconds = new Date().getTime() + expiresInMinutes * 100;
    return Math.floor(expirationTimeInSeconds / 1000);
  }
   
}
