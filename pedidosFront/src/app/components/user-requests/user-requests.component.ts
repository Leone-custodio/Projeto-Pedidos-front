import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderCommand } from 'src/app/models/ordercommand';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/authService';
import { OrderService } from 'src/app/services/orderService';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent{
  authService: AuthService = new AuthService(this.router)
  orderService: OrderService = new OrderService(this.http)

  resultView: OrderCommand = new OrderCommand

  user: UserModel = {
    name: '',
    email: '',
    cpf: '',
    address: '',
    password: ''
  }

  constructor( 
    private router: Router,
    private http: HttpClient
  ){}

  getPedidos(): void {
    const tokenData = this.authService.getToken();
    this.user.name = tokenData.user.name;
    this.user.cpf = tokenData.user.cpf;
    this.user.email = tokenData.user.email;
    this.user.address = tokenData.user.address;
    this.getOrdersByCpf();
  }

  getOrdersByCpf(){
    this.orderService.getOrdersByUserCpf(this.user.cpf)
      .subscribe(resultView => this.resultView = resultView)
  }

  deleteOrder(orderId: string){
    const confirmLogout = window.confirm('Tem certeza de que deseja excluir o seu pedido ?');
    if (confirmLogout) {
      this.orderService.deleteOrder(orderId);
    }
    //window.location.reload();
  }

  

}
