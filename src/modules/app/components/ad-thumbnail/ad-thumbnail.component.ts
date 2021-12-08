import { Component, Input, OnInit } from '@angular/core'
import { AdThumbnail } from '../../models/ad-thumbnail.type'
import { Router } from '@angular/router'

/**
 * Used in FeedComponent, small preview of an ad
 */
@Component({
  selector: 'app-ad-thumbnail',
  templateUrl: './ad-thumbnail.component.html',
  styleUrls: ['./ad-thumbnail.component.css']
})
export class AdThumbnailComponent implements OnInit {
  @Input() ad: AdThumbnail
  imageSrc: string

  constructor(private router: Router) { }

  // load image or put "image not found" picture, if there isn't one provided
  ngOnInit(): void {
    this.imageSrc = (this.ad.images.length > 0) ?
      this.ad.images :
      '../../../../assets/no-ad-pic.png'
  }

  // navigate to the ad's main page
  onClick() {
    this.router.navigate(['/ad/' + this.ad.id])
  }
}
