import { Component } from '@angular/core'
import { Router } from '@angular/router'

/**
 * Responsible to display a search bar and manage when search is requested
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private router: Router) { }

  searchValue = ''

  // when search is requested, then navigate
  search() {
    if (this.searchValue.length > 0) {
      this.router.routeReuseStrategy // this is needed in case of multiple searches
        .shouldReuseRoute = () => false
      this.router
        .navigate(['search/' + this.searchValue])
        .then(_ => this.searchValue = '')
    }
  }

}
