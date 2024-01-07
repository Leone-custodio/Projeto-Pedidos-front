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

  constructor( private authService: AuthService){}

  check(): boolean{
    if(this.checkNavBar == true){
     return this.checkNavBar = false;
    }
    return this.checkNavBar = true;
  } 
 
  ngOnInit(): void {
      const tokenData = this.authService.getToken();
      const name = tokenData.user.name;
      const cpf = tokenData.user.cpf;
      const email = tokenData.user.email;
      const address = tokenData.user.address;
      this.user.name = this.userName(name);
      this.data = true;
  }

  userName( name: string){
    const fullName = name;
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    return firstName;
  }
}
