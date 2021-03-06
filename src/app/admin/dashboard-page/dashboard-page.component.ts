import { Product } from 'src/app/shared/interfaces';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscribable, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  products: Product | any  = [] 
  pSub!: Subscription
  rSub!: Subscription
  productName: string=''
  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe(products => {
      this.products = products
    })
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }
  remove(id: string) {
    this.rSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter((product:any) => product.id !== id)
    })
  }

}
