import { NgModule } from '@angular/core'
import { ConvPreviewComponent } from './components/conv-preview/conv-preview.component'
import { MatCardModule } from '@angular/material/card'
import { SharedModule } from '../../shared/shared.module'
import { MatInputModule } from '@angular/material/input'
import { MessagingComponent } from './components/messaging/messaging.component'
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component'
import { ProfileActionsComponent } from './components/profile-actions/profile-actions.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CreateConversationComponent } from './components/create-conversation/create-conversation.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'
import { AdActionsComponent } from './components/ad-actions/ad-actions.component'
import { MatIconModule } from '@angular/material/icon'
import { NavLinksComponent } from './components/nav-links/nav-links.component'
import { RouterModule } from '@angular/router'
import { ConversationComponent } from './components/conversation/conversation.component'
import { CreateAdComponent } from './components/create-ad/create-ad.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { AuthGuard } from '../../shared/helpers/auth.guard'
import { MessagingService } from './services/messaging.service'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

const routes = [
  { path: 'ad/create', component: CreateAdComponent, canActivate: [AuthGuard] },
  { path: 'ad/:id/edit', component: CreateAdComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  {
    path: 'messages',
    component: MessagingComponent,
    canActivate: [AuthGuard]
  },
  { path: 'messages/:id', component: ConversationComponent, canActivate: [AuthGuard] }
]

/**
 * Member module, provides components specific to logged in users
 */
@NgModule({
  declarations: [
    AdActionsComponent,
    ConvPreviewComponent,
    ConversationComponent,
    CreateAdComponent,

    CreateConversationComponent,
    MessagingComponent,
    NavLinksComponent,
    ProfileActionsComponent,
    ProfileEditComponent
  ],
  exports: [
    MessagingComponent,
    ConversationComponent,
    CreateAdComponent,
    ProfileEditComponent,
    ProfileActionsComponent,
    AdActionsComponent,
    NavLinksComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatAutocompleteModule
  ],
  providers: [AuthGuard, MessagingService]
})
export class MemberModule {}
