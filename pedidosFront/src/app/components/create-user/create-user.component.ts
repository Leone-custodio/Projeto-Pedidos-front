import { Component } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { UserService } from '../../services/userService';

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

  constructor(private userService: UserService) { }

  registerUser(name: string, email: string, cpf: string, address: string, password: string): void {
    this.userService.registerUser(name, email, cpf, address, password)
      .subscribe(
        response => {
          
          console.log(response.name);
        }
        
      );
  }
}
