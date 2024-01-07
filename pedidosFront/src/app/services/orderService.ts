import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { OrderCommand } from "../models/ordercommand";

export class OrderService{
    newOrder: string = '';
    private url = environment.api;
    private orders = environment.order;

    constructor(private http: HttpClient){
    }

    createOder(userCpf : string, productName: string){
        this.newOrder = `${userCpf}/${productName}`;
        return this.http.post<OrderCommand>(`${this.url}${this.orders}createOrder/${this.newOrder}`, this.newOrder);
    }

    insertProducOrder(orderId : string, productName: string){
        this.newOrder = `${orderId}/${productName}`;
        return this.http.post<OrderCommand>(`${this.url}${this.orders}insertProducOrder/${this.newOrder}`, this.newOrder); 
    }

    deleteProducOrder(orderId : string, productName: string){
        this.newOrder = `${orderId}/${productName}`;
        return this.http.post<OrderCommand>(`${this.url}${this.orders}deleteProducOrder/${this.newOrder}`, this.newOrder); 
    }

    deleteOrder(orderId : string){
        return this.http.delete<OrderCommand>(`${this.url}${this.orders}deleteOrder/${orderId}`); 
    }
}