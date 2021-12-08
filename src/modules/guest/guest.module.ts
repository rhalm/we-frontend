import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../shared/shared.module'
import { MatCardModule } from '@angular/material/card'
import { NavLinksComponent } from './components/nav-links/nav-links.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'

/**
 * Guest module, provides components specific to guest users
 */
@NgModule({
  declarations: [
    LoginComponent,
    NavLinksComponent
  ],
  imports: [
    SharedModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatDialogModule
  ],
  exports: [
    LoginComponent,
    NavLinksComponent
  ]
})
export class GuestModule {}
