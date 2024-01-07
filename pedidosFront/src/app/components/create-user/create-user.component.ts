import { Component } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { UserService } from '../../services/userService';
import { UserCommand } from 'src/app/models/userCommand';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {
  user: UserModel = {
    name: '',
    email: '',
    cpf: '',
    address: '',
    password: ''
  };
  
  resultView: UserCommand = new UserCommand;
  loading: boolean = false;

  constructor(private userService: UserService,  private router: Router) { }

  registerUser(name: string, email: string, cpf: string, address: string, password: string): void {
    this.loading = true;
    this.userService.registerUser(name, email, cpf, address, password)
      .subscribe(
        response => {
          if(response.success == true){
            window.alert(`${response.message}`);
            this.loading = false;
            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });

          }else{
              window.alert(`${response.message}`);
              this.loading = false;
              window.location.reload();
          }
        })
  }

  getUser(cpf: string) {
    this.loading = true;
    this.userService.getUserByCpf(cpf).subscribe(resultView => {
    this.resultView = resultView;
    
    if (this.resultView.success) {
      const expirationTime = this.calculateExpirationTime();
      const userCpfData: UserCommand = {
        success: this.resultView.success,
        message: this.resultView.message,
        user: this.resultView.user,
        expirationTime: expirationTime
      };
          
      this.showSuccessAlert(this.resultView.message);
      this.loading = false;
    } else {
      this.showErrorAlert(this.resultView.message);
      this.loading = false;
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

  showSuccessAlert(message: string) {
  
    window.alert(`Success: ${message}`);
  }

  showErrorAlert(message: string) {

    window.alert(`Error: ${message}`);
  }
}
