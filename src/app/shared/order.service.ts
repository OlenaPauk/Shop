import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { FbResponce, Orders, Product } from './interfaces';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  create(order: Orders) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(
        map((res: FbResponce | any) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date)
          }
        })
      )
  }
  getAll() {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
      .pipe(map((res: FbResponce | any) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }

      ))
  }

  remove(id:string){
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`)
  }


}
