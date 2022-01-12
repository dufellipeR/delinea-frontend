import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    }, { updateOn: 'change'});
  }


     get f(){
      return this.form.controls;
    }


    submit(){
      console.log(this.form.value);
      this.productService.create(this.form.value).subscribe((res:any) => {
           console.log('Product created successfully!');
           this.router.navigateByUrl('product/index');
      })
    }
}
