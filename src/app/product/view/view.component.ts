import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  product!: Product;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
   ) { }


   ngOnInit(): void {
    this.id = this.route.snapshot.params['productId'];
    this.product = {id: this.id, content: 'Blood of Elves', title: 'book', price: 250, created_datetime: Date.now()};


    // this.productService.find(this.id).subscribe((data: Product)=>{
    //   this.product = data;
    // });
  }
}
