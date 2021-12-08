import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FeedService } from '../../../../shared/services/feed.service'

/**
 * Shows and manages filtering options for the ad feed
 */
@Component({
  selector: 'app-ad-options',
  templateUrl: './ad-options.component.html',
  styleUrls: ['./ad-options.component.css']
})
export class AdOptionsComponent implements OnInit {
  @Input() searchTerm: string
  @Input() userId: string

  // tell Feed if filtering was requested
  @Output() filterEvent = new EventEmitter

  withImageOnly: boolean = false

  selectedCategories = new FormControl()
  categoryList: string[] = this.feedService.getCategories()

  selectedLocations = new FormControl()
  locationList: string[]
  loaded: boolean = false

  constructor(private feedService: FeedService) { }

  // load options (locations) that are dependent on feedService
  ngOnInit(): void {
    this.feedService.getLocations()
      .subscribe(result => this.locationList = result,
        error => console.log(error))
      .add(() => this.loaded = true)
  }

  // send filtering options to parent component
  filter() { this.filterEvent.emit(this.getOptions()) }

  // clear all options as if none was selected and reload filtering
  clear() {
    this.selectedCategories.reset()
    this.selectedLocations.reset()
    this.withImageOnly = false

    this.filter()
  }

  // get all selected options
  getOptions() {
    return {
      searchTerm: this.searchTerm,
      categories: this.selectedCategories.value,
      locations: this.selectedLocations.value,
      withImageOnly: this.withImageOnly,
      userId: this.userId
    }
  }
}
