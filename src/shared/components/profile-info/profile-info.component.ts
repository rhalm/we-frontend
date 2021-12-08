import { Component, Input, OnInit } from '@angular/core'
import { Profile } from '../../models/profile.type'

/**
 * A reusable component to display profile information
 */

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  @Input() profile: Profile
  @Input() truncateAt: number = 0
  imageSrc: string
  introduction: string

  constructor() { }

  // loads provided profile
  ngOnInit() {
    if (this.profile.image == null) // load image or the image that is used when there's none provided
      this.imageSrc = '../../../assets/no-profile-pic.png'
    else
      this.imageSrc = this.profile.image

    // if truncating was requested then change introduction accordingly before displaying it
    const origIntro = this.profile.introduction
    if (this.truncateAt != 0 && origIntro.length > this.truncateAt)
      this.introduction = origIntro.slice(0, this.truncateAt - 3) + '...'
    else
      this.introduction = origIntro
  }
}
