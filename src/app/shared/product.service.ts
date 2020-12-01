import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { FbResponce, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  create(product: Product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
    .pipe(
      map((res: FbResponce | any)=>{
        return {
          ...product,
          id:res.name,
          date: new Date(product.date)
        }
      })
    )
  }
}
