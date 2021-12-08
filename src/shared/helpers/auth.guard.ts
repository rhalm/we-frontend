import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '../services/auth.service'

/**
 * Guards paths that are only available to members (logged in users)
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) { }

  // returns user's logged in status, if they're not logged in, then navigate home
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedIn = this.service.isLoggedIn()
    if (!loggedIn) this.router.navigate(['/']).then()
    return loggedIn
  }


}



