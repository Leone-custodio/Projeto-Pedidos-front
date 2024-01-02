import { Component, NO_ERRORS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { ProductService } from '../services/productService';
import { ProductCommandResultModel } from '../models/commandResultModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  resultView: ProductCommandResultModel = new ProductCommandResultModel;
  price: number = 30.12;

  constructor(private productService: ProductService){
    this.getProductsList()
  }

  async getProductsList(){
    (await this.productService.getAllProducts())
      .subscribe(resultView => this.resultView = resultView)
  }

  ngOnInit(): void {
  }
  
}
