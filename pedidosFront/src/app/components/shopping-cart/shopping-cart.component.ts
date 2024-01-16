import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderModel } from 'src/app/models/orderModel';
import { OrderCommand } from 'src/app/models/ordercommand';
import { AuthService } from 'src/app/services/authService';
import { OrderService } from 'src/app/services/orderService';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  order : OrderModel = {
    id: '',
    createdDate:  new Date,
    userName: '',
    UserCpf: '',
    listProducts: [],
    total: 0
  }

  orderService : OrderService = new OrderService(this.http);

  constructor( private http: HttpClient, private authService: AuthService){
    this.getOrderToken()
  }

  getOrderToken(){
   const orderToken = this.authService.getOrderToken();
   this.order.id = orderToken.order.id;
   this.order.UserCpf = orderToken.order.userCpf;
   this.order.userName = orderToken.order.userName;
   this.order.listProducts = orderToken.order.listProducts;
   this.order.total = orderToken.order.total;
  }

  removeItemOrder(orderId: string, productName: string){
    this.orderService.deleteProducOrder(orderId, productName).subscribe(
      response =>{ 
      const orderData: OrderCommand = {
        success: response.success,
        message: response.message,
        order: response.order,
        expirationTime: this.calculateExpirationTime(),
      };
      localStorage.setItem('orderData', JSON.stringify(orderData));
      console.log(orderData);
      window.location.reload();
    });
  }

  calculateExpirationTime(): number {
    const expiresInMinutes = 60; 
    const expirationTimeInSeconds = Math.floor(new Date().getTime() / 1000) + expiresInMinutes * 60;
    return expirationTimeInSeconds;
  }

}
