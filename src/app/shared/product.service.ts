import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { FbResponce, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
type: string = 'Phone'
cartProducts:  Product[] = []
  constructor(private http: HttpClient) { }
  create(product: Product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(
        map((res: FbResponce | any) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date)
          }
        })
      )
  }
  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
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
  getById(id: string) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product | any) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }
      ))
  }
  remove(id:string){
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }
  update(product:Product){
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`,product)
  }
  setType(type:string){
    this.type = type
  }
  addProduct(product:Product){
    this.cartProducts.push(product)
  }
}
