import { Product } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$:Observable<any> | undefined 
  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productServ.getAll()
    console.log(this.products$);
    
  }

}
