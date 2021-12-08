import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FeedService } from '../../../../shared/services/feed.service'
import { Ad } from '../../models/ad.type'
import { ProfileService } from '../../../../shared/services/profile.service'
import { Profile } from '../../../../shared/models/profile.type'

/**
 * Shows information about the requested ad and the advertiser
 */
@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  ad: Ad // ad loaded from feedService
  imageSrc: string
  loaded = false // true if everything has been successfully loaded
  success = true
  profile: Profile // advertiser's profile
  found: boolean = true // false if the requested ad was not found

  constructor(private feedService: FeedService,
              private profileService: ProfileService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  // Get ad and profile from the services and handle errors
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.feedService.getAd(params['id'])
        .subscribe((result) => {
          this.ad = result.body

          this.imageSrc = (this.ad.images.length > 0) ?
             this.ad.images :
            '../../../../assets/no-ad-pic.png'

          this.profileService.getProfileByUser(this.ad.userId)
            .subscribe(result => {
                this.profile = result
                this.loaded = true
              },
              error => {
                this.success = false
              })
          this.found = true
        }, _ => {
          this.found = false
        })
    })
  }

  // navigate to the advertiser's page
  onProfileClick() {
    this.router.navigate(['/profile/' + this.profile.id])
  }

}
