
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/userService'; // Crie este serviço para gerenciar as operações do usuário
import { UserModel } from '../models/userModel';
import { UserCommand } from '../models/userCommand';
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
  isLoading: boolean = false;

  resultView: UserCommand = new UserCommand;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef ) { }
 
  loginUser(cpf: string, password: string){
    this.isLoading = true;
    (this.userService.login(cpf, password))
      .subscribe(resultView => this.resultView = resultView)
    if (this.resultView.success = true) {
      const userData : UserCommand = {
        success: this.resultView.success,
        message: this.resultView.message,
        user: this.resultView.user
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      console.log(userData)
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
