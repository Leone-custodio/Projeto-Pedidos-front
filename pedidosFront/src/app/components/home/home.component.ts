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
  orderView: OrderCommand = new OrderCommand;
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

  createNewOrder(userCpf: string, productName: string){
    this.newOder(userCpf, productName);
  }

  ngOnInit(): void {
    this.getProductsList()
    const tokenData = this.authService.getToken();
    this.user.name = tokenData.user.name;
    this.user.cpf = tokenData.user.cpf;
    this.user.email = tokenData.user.email;
    this.user.address = tokenData.user.address;
  }
  
  calculateExpirationTime(): number {
    const expiresInMinutes = 1;
    const expirationTimeInSeconds = new Date().getTime() + expiresInMinutes * 100;
    return Math.floor(expirationTimeInSeconds / 1000);
  }

  newOder(userCpf: string, productName: string){
    this.orderService.createOder(userCpf, productName).subscribe(orderView =>{
      this.orderView = orderView
      
      if (this.orderView.success) {
        const expirationTime = this.calculateExpirationTime();
        const orderData: OrderCommand = {
          success: this.orderView.success,
          message: this.orderView.message,
          order: this.orderView.order,
          expirationTime: expirationTime
        };
        
        localStorage.setItem('orderData', JSON.stringify(orderData));
        console.log(orderData);
        
        window.alert(this.resultView.message);
        
      } else {
        window.alert(this.resultView.message);
      }
      
      this.loading = false; 
      window.location.reload();
      });
  }
  
}
