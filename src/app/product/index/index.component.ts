import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Reply } from '../reply';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  products: Product[] = [
    {id: 5, content: 'Blood of Elves', title: 'book', price: 250, created_datetime: Date.now()}
  ]

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: Reply)=>{
      this.products = data.results;
      console.log(this.products);
    })
  }


     deleteProduct(id:number){

      this.productService.delete(id).subscribe(res => {
           this.products = this.products.filter(item => item.id !== id);
           console.log('Product deleted successfully!');
      })
    }

}
