import { Component } from '@angular/core'
import { LoginComponent } from '../login/login.component'
import { MatDialog } from '@angular/material/dialog'

/**
 * Handle navigation links available for Guest user
 */
@Component({
  selector: 'guest-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.css']
})
export class NavLinksComponent {
  constructor(private dialog: MatDialog) { }

  // if login is requested then open LoginComponent
  signIn() {
    this.dialog.open(LoginComponent)
  }

  signUp() {
    let dialogRef = this.dialog.open(LoginComponent)
    dialogRef.componentInstance.registration = true
  }
}
