import { Injectable} from "@angular/core";
import {HttpClient} from  "@angular/common/http"
import{environment} from "src/environments/environment"
import { ProductCommandResultModel } from "../models/commandResultModel";


@Injectable(
)
export class ProductService{
    
    private url = environment.api;
    private product = environment.product;

    constructor(private http: HttpClient){
    }

    async getAllProducts(){
        return this.http.get<ProductCommandResultModel>(`${this.url}${this.product}getAllProducts`) 
    }
}

