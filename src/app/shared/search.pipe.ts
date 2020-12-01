import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName=''): any {
    if(!productName.trim()){
      return products
    }
    else{
      return products.filter(product=>{
        return product.title?.toLowerCase().includes(productName.toLowerCase())
      })
    }
  }

}