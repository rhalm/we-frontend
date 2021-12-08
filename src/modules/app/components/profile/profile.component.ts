import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Profile } from '../../../../shared/models/profile.type'
import { ProfileService } from '../../../../shared/services/profile.service'

/**
 * Shows profile information
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profile: Profile
  loaded: boolean = false
  found: boolean = true
  success: boolean = true

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  // load requested profile
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      if (!id)
        // if id wasn't provided in the params, then get user's own profile
        // and navigate to that address
        // (this path is guarded, so only logged in users can use it)
        this.profileService
          .getMyProfile()
          .subscribe(
            result => this.router.navigate(['/profile/' + result.id]),
            _ => {
              this.success = false
            })
      else
        // otherwise load given id's profile
        this.profileService
          .getProfile(id)
          .subscribe(
            result => this.profile = result.body,
            _ => this.found = false)
          .add(() => this.loaded = true)
    })
  }
}

