import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Reply } from '../reply';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  products!: Product[]
  constructor(public productService: ProductService, public authService: AuthService, public router: Router) { }

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

    logout() {
      this.authService.logout()
      this.router.navigateByUrl('');
    }

}
