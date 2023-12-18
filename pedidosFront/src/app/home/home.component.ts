import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { ProductService } from '../services/productService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  listPructs: ProductModel[] = [] 

  constructor(private productService: ProductService)
  {

  }

  ngOnInit(): void {
    this.listProducts()
  }

  listProducts(): void{
    this.productService.productList().subscribe((list)=>(this.listPructs = list));
  }

}
