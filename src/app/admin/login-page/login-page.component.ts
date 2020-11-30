import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted: boolean = false
  form: FormGroup
  constructor() {
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

    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }
  }
}
