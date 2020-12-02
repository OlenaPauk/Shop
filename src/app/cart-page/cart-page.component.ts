import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts:any= []
  totalPrice = 0
  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.productServ.cartProducts);


    this.cartProducts = this.productServ.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price

    }

  }

}
