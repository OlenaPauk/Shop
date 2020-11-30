import { User } from './../shared/user';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loadavg } from 'os';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted: boolean = false
  form: FormGroup
  constructor(public auth: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),

    })

  }

  ngOnInit(): void {

  }
  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    const user:User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.login(user).subscribe(res => {
      console.log(res);
      this.form.reset;
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    },()=>{
      this.submitted = false
    })
  }
}
