import { Component, Input, OnInit } from '@angular/core'
import { Profile } from '../../../../shared/models/profile.type'
import { AuthService } from '../../../../shared/services/auth.service'
import { CreateConversationComponent } from '../create-conversation/create-conversation.component'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'

/**
 * Different actions that can be done on a profile page (if the user is logged in)
 * If it's their own profile: they can edit
 * If it's not: they can send a message
 */
@Component({
  selector: 'member-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.css']
})
export class ProfileActionsComponent implements OnInit {
  @Input() profile: Profile
  loggedIn: boolean

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) { }

  // check if user is logged in
  ngOnInit() { this.loggedIn = this.authService.isLoggedIn() }

  // navigate to edit page
  editProfile = () => this.router.navigate(['/profile/' + this.profile.id + '/edit'])

  // open CreateConversationComponent in a dialog
  sendMessage = () => this.dialog.open(CreateConversationComponent, { data: this.profile })
}
