import { Injectable} from "@angular/core";
import {HttpClient} from  "@angular/common/http"
import{environment} from "src/environments/environment"
import { CommandResultModel } from "../models/commandResultModel";
import { ProductModel } from "../models/productModel";


@Injectable(
)
export class ProductService{
    
    private url = environment.api;

    constructor(private http: HttpClient){
    }

    async getAllProducts(){
        return this.http.get<CommandResultModel>(this.url) 
    }
}

