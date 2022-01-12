import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }


//   ngOnInit() {
//     this.signinForm = this.fb.group({
//         email: [null, [Validators.required, Validators.email]],
//         password: [null, Validators.required]
//     },{ updateOn: 'change'});
// }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),

    }, { updateOn: 'change'});
  }

  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);

    this.authService.login(this.form.value['email'], this.form.value['password'])
    .pipe(first())
    .subscribe({
        next: () => {
            // get return url from route parameters or default to '/'
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl('product/index');
        },
        error: error => {
          console.log('error' + error);

        }
    });


  }
}
