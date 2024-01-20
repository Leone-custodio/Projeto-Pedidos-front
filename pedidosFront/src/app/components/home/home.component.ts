import { Component, NO_ERRORS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { ProductModel } from '../../models/productModel';
import { ProductService } from '../../services/productService';
import { AuthService } from 'src/app/services/authService';
import { OrderService } from 'src/app/services/orderService';
import { ProductCommand } from 'src/app/models/productCommand';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderCommand } from 'src/app/models/ordercommand';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  resultView: ProductCommand = new ProductCommand;
  authService: AuthService = new AuthService(this.router);
  orderService: OrderService = new OrderService(this.http);
  user: UserModel = {
    name: '',
    email: '',
    cpf: '',
    address: '',
    password: ''
  }
  loading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private productService: ProductService
    ){ }

  async getProductsList(){
    (await this.productService.getAllProducts())
      .subscribe(resultView => this.resultView = resultView)
  }

  createOrderToken(){
    this.authService.logout();
  }

  checkOrder(userCpf: string, productName: string){
   
    this.newOder(userCpf, productName);
    
  }

  ngOnInit(): void {
    this.getProductsList();
    const tokenData = this.authService.getToken();
    this.user.name = tokenData.user.name;
    this.user.cpf = tokenData.user.cpf;
    this.user.email = tokenData.user.email;
    this.user.address = tokenData.user.address;
  }
  
  calculateExpirationTime(): number {
    const expiresInMinutes = 60; 
    const expirationTimeInSeconds = Math.floor(new Date().getTime() / 1000) + expiresInMinutes * 60;
    return expirationTimeInSeconds;
  }
  
  newOder(userCpf: string, productName: string){
    const checkOrderData = this.authService.getOrderToken();
    const expirationTime = this.calculateExpirationTime();

    if (checkOrderData && userCpf) {
      this.orderService.insertProducOrder(checkOrderData.order.id, productName).subscribe(
        response =>{

          if(response.success == true){
            window.alert(`${response.message}, Acesse o seu carrinho pra conferir a suas compras`);
            const orderData: OrderCommand = {
              success: response.success,
              message: response.message,
              order: response.order,
              expirationTime: expirationTime
            };
            localStorage.setItem('orderData', JSON.stringify(orderData));
            console.log(orderData);
          }
        }
        );
    }

    else if(userCpf && !checkOrderData){
        this.orderService.createOder(userCpf, productName).subscribe(
          response =>{
            if(response.success == true){
              window.alert(`${response.message}, Acesse o seu carrinho pra conferir a suas compras`);
              const orderData: OrderCommand = {
                success: response.success,
                message: response.message,
                order: response.order,
                expirationTime: expirationTime
              };
              localStorage.setItem('orderData', JSON.stringify(orderData));
              console.log(orderData);
            }
          }
        )
    }
    else
    {
      window.alert(' Erro ao realizar o pedido ! Faça o login para fazer o seu pedido');
    }
  }
}
