import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

/**
 * Show ad results after search
 * Shows what word was requested and uses FeedComponent to show ads
 * with the search word as input
 */
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchTerm: string

  constructor(private route: ActivatedRoute) {
  }

  // get search word from parameter
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['q']
    })
  }


}
