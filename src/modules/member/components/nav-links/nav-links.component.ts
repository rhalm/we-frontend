import { Component } from '@angular/core'
import { AuthService } from '../../../../shared/services/auth.service'

/**
 * Handle navigation links available for logged in user
 */
@Component({
  selector: 'member-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.css']
})
export class NavLinksComponent {

  constructor(private service: AuthService) { }

  // if log out button is clicked, start logging out with AuthService
  logout = () => this.service.logout()
}
