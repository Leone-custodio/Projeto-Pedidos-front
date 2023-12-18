import { ProductModel } from "./productModel";

export class OrderModel{
    id: string = "";
    createdDate!: Date;
    userName: string = "";
    UserCpf: string = "";
    listProducts: ProductModel[] = [];
    total: number = 0;
}