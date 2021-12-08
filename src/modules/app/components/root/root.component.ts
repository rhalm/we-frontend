import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../../shared/services/auth.service'

/**
 * Main component that is bootstrapped, loads navbar and shows router-outlet
 */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  searchValue: string
  loggedIn: boolean
  loaded: boolean = false

  constructor(
    private service: AuthService) {
  }

  // load navbar based on login status
  ngOnInit() {
    this.loggedIn = this.service.isLoggedIn()
  }
}
