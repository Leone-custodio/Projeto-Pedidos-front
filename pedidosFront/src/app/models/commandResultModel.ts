import { ProductModel } from "./productModel";

export class ProductCommandResultModel{
    success: boolean = false ;
    message: string = "";
    product?: ProductModel;
    products?: ProductModel[]; 
}