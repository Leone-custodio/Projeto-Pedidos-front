import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { OrderCommand } from "../models/ordercommand";

export class OrderService{
    newOrder: string = '';
    private url = environment.api;
    private orders = environment.order;

    constructor(private http: HttpClient){
    }

    createOder(userCpf : string, productId: string){
        this.newOrder = `${userCpf}/${productId}`;
        return this.http.post<OrderCommand>(`${this.url}${this.orders}createOrder/${this.newOrder}`, this.newOrder);
    }

    insertProducOrder(orderId : string, productId: string){
        this.newOrder = `${orderId}/${productId}`;
        var teste: string = `${this.url}${this.orders}insertProducOrder/${this.newOrder}`;
        console.log(teste);
         return this.http.post<OrderCommand>(teste, this.newOrder); 
    }

    deleteProducOrder(orderId : string, productId: string){
        return this.http.delete<OrderCommand>(`${this.url}${this.orders}deleteProducOrder/${orderId}/${productId}`); 
    }

    deleteOrder(orderId : string){
        return this.http.delete<OrderCommand>(`${this.url}${this.orders}deleteOrder/${orderId}`); 
    }

    getOrdersByUserCpf(userCpf: string){
        return this.http.get<OrderCommand>(`${this.url}${this.orders}getByUserCpf/${userCpf}`)
    }
}