import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from '../../../../shared/services/auth.service'
import { Router } from '@angular/router'
import { Profile } from '../../../../shared/models/profile.type'
import { FeedService } from '../../../../shared/services/feed.service'
import { Location } from '@angular/common'

/**
 * A smaller component, shows and manages actions (edit, delete) and their availability for an ad
 */
@Component({
  selector: 'member-ad-actions',
  templateUrl: './ad-actions.component.html',
  styleUrls: ['./ad-actions.component.css']
})
export class AdActionsComponent implements OnInit {
  loggedIn: boolean
  @Input() profile: Profile // ad's advertiser
  @Input() id: string // for the ad

  constructor(private authService: AuthService,
              private feedService: FeedService,
              private location: Location,
              private router: Router) { }

  // on initialization check user's status
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn()
  }

  // if edit is requested, navigate to the ad's edit page
  edit = () => this.router.navigate(['/ad/' + this.id + '/edit'])

  // if delete is requested, first ask for confirmation and then tell FeedService
  // to delete ad
  delete() {
    if (confirm('Are you sure to delete this item?'))
      this.feedService.delete(this.id)
        .subscribe(_ => this.location.back(),
          error => console.log(error))
  }
}
