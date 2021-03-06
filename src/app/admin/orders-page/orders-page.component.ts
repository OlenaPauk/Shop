import { OrderService } from './../../shared/order.service';
import { Orders } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: Orders | any = [] 
  pSub!: Subscription
  rSub!: Subscription
  constructor(private orderServ: OrderService) { }

  ngOnInit(): void {
    this.pSub = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
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
    this.rSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter((order:any) => order.id !== id)
    })
  }
}
