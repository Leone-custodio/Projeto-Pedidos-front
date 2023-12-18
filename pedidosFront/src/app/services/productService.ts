import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from  "@angular/common/http"
import { ProductModel } from "../models/productModel";
import { Observable } from "rxjs";
@Injectable(
)
export class ProductService{
    urlBase = "https://localhost:7122/products/"

    constructor(private http: HttpClient){
      
    }

    productList() : Observable<ProductModel[]>{
      return this.http.options<ProductModel[]>(" https://localhost:7122/v1/products/getAllProducts")
    } 
}

