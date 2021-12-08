import { Component } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { Conversation } from '../../models/conversation.type'
import { MessagingService } from '../../services/messaging.service'
import { ProfileService } from '../../../../shared/services/profile.service'

@Component({
  selector: 'member-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent {
  conversations: Conversation[]
  counter = 0

  constructor(private messagingService: MessagingService,
              private profileService: ProfileService) { }

  // load conversations
  ngOnInit() { this.load() }

  // load the conversations and display them
  load(): void {
    this.counter = 0

    // get partner's userId from participants
    const userId = localStorage.getItem('userId')

    this.messagingService
      .getConversations(this.pageSize, this.pageIndex)
      .subscribe((result) => {
        this.conversations = result.content
        this.length = result.totalElements

        // load the profiles in the parent component as it is this component's
        // responsibility to provide the data
        this.conversations.map(
          c => {
            const partnerId = c.participants[0] == userId ?
              c.participants[1] :
              c.participants[0]

            this.profileService.getProfileByUser(partnerId)
              .subscribe(result => {
                c.profile = result
                this.counter += 1
              }, error => this.handleErrors(error))
          }
        )
      }, error => this.handleErrors(error))
  }

  handleErrors(e) {
    console.log(e)
    this.error = true;
  }

  error = false

  // pagination
  length
  pageSize = 5
  pageIndex = 0

  // handle pagination events, reload
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    this.load()
  }
}
