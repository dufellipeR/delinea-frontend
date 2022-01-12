import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  product!: Product;
  form!: FormGroup;



  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['productId'];
    // this.product = {id: 5, content: 'Blood of Elves', title: 'book', price: 250, created_datetime: ''};
    this.productService.find(this.id).subscribe((data: Product)=>{
      console.log(data);

      this.product = data;

    });

    this.form = new FormGroup({
      title: new FormControl(null , Validators.required),
      content: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }


  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.productService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Product updated successfully!');
         this.router.navigateByUrl('product/index');
    })
  }

}
