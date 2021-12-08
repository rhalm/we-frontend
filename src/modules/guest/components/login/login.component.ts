import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthResponse } from 'src/shared/models/auth-response.type'
import { AuthService } from '../../../../shared/services/auth.service'

/**
 * Component responsible for letting the user log in
 * Has a form for login information and sends it to AuthService when submitted
 */
@Component({
  selector: 'guest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup
  notFound: boolean = false

  constructor(private formBuilder: FormBuilder,
              private service: AuthService) {
    this.createForm()
  }

  registration: boolean = false

  ngOnInit() {}

  // create form with username, email and password field and it's validators
  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': [null],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]],
      'confirmpassword': [null]
    })

    if (this.registration) {
      this.formGroup.get('username').setValidators([Validators.required]);
      this.formGroup.get('confirmpassword').setValidators([Validators.required]);
    }
  }

  escapeRegex(text) {
    return (text == null) ?
      null :
      text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  // checks if login information provided is valid
  isValid(): boolean {
    return this.formGroup.valid && !this.submitted
  }

  submitted: boolean = false
  response: AuthResponse = null

  // when submitted, send info to AuthService and handle result
  onSubmit(post) {
    this.submitted = true

    const response = this.registration ?
      this.service.signUp({ username: post.username, email: post.email, password: post.password }) :
      this.service.signIn({ email: post.email, password: post.password })

    response
      .subscribe(response => {
        this.response = response
        if (response.successful)
          setTimeout(() => window.location.reload(), 500) // if user is authenticated then reload page with some delay
        else
          this.submitted = false
      }, error => {
        console.log(error)
      })
  }
}
