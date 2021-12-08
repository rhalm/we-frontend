import { Component, Input, OnInit } from '@angular/core'
import { AdThumbnail } from '../../models/ad-thumbnail.type'
import { FeedService } from '../../../../shared/services/feed.service'
import { PageEvent } from '@angular/material/paginator'
import { FeedOptions } from '../../models/feed-options.type'
import { Pageable } from '../../../../shared/models/pageable.type'

/**
 * The main feed, show a list of previews of ads in a grid with pagination
 * and options to filter
 */
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  ads: AdThumbnail[]

  @Input() searchTerm: string
  @Input() userId: string

  withImageOnly = false
  breakpoint: number
  options: FeedOptions
  errorMessage: string = null
  loaded: boolean = false

  showFirstLastButtons = true

  constructor(private feedService: FeedService) { }

  // create new feed options to pass to AdOptionsComponent,
  // calculate grid size and load feed
  ngOnInit() {
    this.options = new FeedOptions()
    this.options.searchTerm = this.searchTerm
    this.options.userId = this.userId
    this.breakpoint = this.calcCols(window.innerWidth) // responsive grid

    this.filter(this.options)
  }

  // this is what the AdOptionsComponent uses when filtering is requested
  // reloads feed based on the options (pagination, filtering, searchTerm...)
  filter(options): void {
    options.size = this.pageSize
    options.page = this.pageIndex
    options.userId = this.userId
    options.searchTerm = this.searchTerm

    this.options = options
    this.feedService
      .getAds(options)
      .subscribe((result) => {
        if (result.ok) {
          this.ads = result.body.content
          this.length = result.body.totalElements
          this.loaded = true
        } else {
          this.errorMessage = "Something went wrong"
          this.loaded = true
        }
      }, error => {
          console.log(error)
          this.loaded = true
          this.errorMessage = "Server is unreachable, please try reloading the page later."
        })
  }

  length: number // how many ads there are in total
  pageSize = 12
  pageIndex = 0

  // manage navigation, in case of event change pageSize and pageIndex
  // and reload
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex

    this.filter(this.options)
  }

  // if window gets resized then recalculate grid size
  onResize(event) {
    this.breakpoint = this.calcCols(event.target.innerWidth)
  }

  // calculate columns number in grid
  calcCols(width) {
    const result = Math.floor((width) / 235)
    return result == 5 ? 4 :  // so rows don't stop in the middle while paginating ads
      result > 6 ? 6 : result  // maximum row count should be 6
  }
}
