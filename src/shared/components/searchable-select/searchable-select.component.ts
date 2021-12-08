import { Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ReplaySubject } from 'rxjs'

/**
 * A searchable dropdown list with optional multi select
 */
@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css']
})
export class SearchableSelectComponent implements OnInit {
  @Input() title: string
  @Input() options: string[]
  @Input() selectedOptions: FormControl
  @Input() multi: boolean = false
  @Input() required: boolean = false

  filterControl: FormControl = new FormControl()
  filteredOptions: ReplaySubject<String[]> = new ReplaySubject<String[]>()

  // load and subscribe to the search word on init
  ngOnInit() {
    // load the initial list
    this.filteredOptions.next(this.options)

    // subscribe to changes to the search word
    this.filterControl.valueChanges
      .subscribe(() => this.filterOptions())
  }

  // change filteredOptions based on the search word
  private filterOptions() {
    let searchWord = this.filterControl.value
    this.filteredOptions.next(
      this.options
        .filter(o => o
          .toLowerCase()
          .indexOf(searchWord.toLowerCase()) > -1) // if it was found
    )
  }
}
