import { OrderModel } from "./orderModel";

export class OrderCommand{
    success: boolean = false ;
    message: string = "";
    order?: OrderModel;
    orders?: OrderModel[]; 
    expirationTime: number = 0;
};