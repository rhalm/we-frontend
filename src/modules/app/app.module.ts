import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'

import { AdDetailsComponent } from './components/ad-details/ad-details.component'
import { AdOptionsComponent } from './components/ad-options/ad-options.component'

import { AdThumbnailComponent } from './components/ad-thumbnail/ad-thumbnail.component'

import { FeedComponent } from './components/feed/feed.component'
import { ProfileComponent } from './components/profile/profile.component'
import { RootComponent } from './components/root/root.component'
import { FeedService } from '../../shared/services/feed.service'
import { ProfileService } from '../../shared/services/profile.service'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSidenavModule } from '@angular/material/sidenav'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatPaginatorModule } from '@angular/material/paginator'
import { AuthService } from '../../shared/services/auth.service'
import { SearchResultComponent } from './components/search-result/search-result.component'
import { MemberModule } from '../member/member.module'
import { GuestModule } from '../guest/guest.module'
import { SharedModule } from '../../shared/shared.module'
import { AuthGuard } from '../../shared/helpers/auth.guard'
import { AngularFireModule} from '@angular/fire/'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthInterceptor } from 'src/shared/helpers/auth.interceptor'
import { firebaseConfig } from 'src/environments/firebase.config'

const routes = [
  { path: '', component: FeedComponent },
  { path: 'ad/:id', component: AdDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'search/:q', component: SearchResultComponent },
  { path: '**', redirectTo: '/' }
]

/**
 * Main module
 */
@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    GuestModule,
    MemberModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatSelectModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    RootComponent,
    SearchResultComponent,
    ProfileComponent,
    FeedComponent,
    AdThumbnailComponent,
    AdOptionsComponent,
    AdDetailsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    FeedService, 
    ProfileService, 
    AuthService],
  bootstrap: [RootComponent]
})
export class AppModule {
}
