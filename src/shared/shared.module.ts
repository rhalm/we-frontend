import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileInfoComponent } from './components/profile-info/profile-info.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatPaginatorModule } from '@angular/material/paginator'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'
import { MatOptionModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { LoadingComponent } from './components/loading/loading.component'
import { SearchableSelectComponent } from './components/searchable-select/searchable-select.component'


/**
 * Shared module, provides smaller components that are shared between modules
 */
@NgModule({
  declarations: [
    ProfileInfoComponent,
    SearchBarComponent,
    LoadingComponent,
    SearchableSelectComponent
  ],
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    ProfileInfoComponent,
    SearchBarComponent,
    LoadingComponent,
    SearchableSelectComponent
  ]
})
export class SharedModule {}
