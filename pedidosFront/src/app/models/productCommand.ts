import { ProductModel } from "./productModel";

export class ProductCommand{
    success: boolean = false ;
    message: string = "";
    product?: ProductModel;
    products?: ProductModel[]; 
}