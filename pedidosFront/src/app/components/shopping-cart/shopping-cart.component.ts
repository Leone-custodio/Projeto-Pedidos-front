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
  order : OrderModel ={
    id: '',
    createdDate: new Date,
    userName: '',
    UserCpf: '',
    listProducts: [],
    total: 0
  }
  orderService: OrderService = new OrderService(this.http);

  constructor(private http: HttpClient, private authService: AuthService){
    const orderData = this.authService.getOrderToken();
    this.order.id = orderData.order.id;
    this.order.UserCpf = orderData.order.userCpf;
    this.order.listProducts = orderData.order.listProducts;
    this.order.total = orderData.order.total;
  }

  removeItens(orderId : string, productId: string){
    const confirm = window.confirm('Tem certeza de que deseja excluir este item ?');

    if(confirm){
      this.orderService.deleteProducOrder(orderId,productId).subscribe(
        response =>{
          const orderData: OrderCommand = {
            success: response.success,
            message: response.message,
            order: response.order,
            expirationTime: this.calculateExpirationTime()
          };
          localStorage.setItem('orderData', JSON.stringify(orderData));
          console.log(orderData);
          window.location.reload();
        }
      );
    }
  }

  calculateExpirationTime(): number {
    const expiresInMinutes = 60; 
    const expirationTimeInSeconds = Math.floor(new Date().getTime() / 1000) + expiresInMinutes * 60;
    return expirationTimeInSeconds;
  }

}
