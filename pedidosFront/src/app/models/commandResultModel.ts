import { ProductModel } from "./productModel";

export class CommandResultModel{
    success: boolean = false ;
    message: string = "";
    product?: ProductModel;
    products?: ProductModel[]; 
}