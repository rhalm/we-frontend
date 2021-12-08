import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MessagingService } from '../../services/messaging.service'
import { Message } from '../../models/message.type'

/**
 * Conversation's main page
 */
@Component({
  selector: 'member-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private id: string // conversation id
  messages: Message[]
  userId: string
  notFound: boolean = false
  title: string

  constructor(
    private service: MessagingService,
    private route: ActivatedRoute) {
  }

  // load information needed to display the conversation
  ngOnInit(): void {
    // get userId from localStorage: this is only needed to style messages based on who sent it
    this.userId = localStorage.getItem('userId')

    this.route.params.subscribe(params => {
      this.id = params['id'] // get conversation's id

      this.service.getConversation(this.id) // load conversation information and handle errors
        .subscribe(conv => {
            this.title = conv.title
            this.service.getMessages(this.id)
              .subscribe(
                result => this.messages = result.content,
                error => console.log(error))
          },
          _ => this.notFound = true)
    })
  }

  // check if message is valid (not empty or only whitespaces)
  isValid(content: string) {
    return content.length != 0 && content.trim().length > 0
  }

  // send message data to FeedService to create a new message in conversation
  sendMessage(content: string) {
    this.service.sendMessage(this.id, content)
      .subscribe(_ =>
        window.location.reload() // if done, refresh
      )
  }

  // design the created date based on user's timezone
  format = (createdAt: string) => {
    const date = new Date(createdAt)
    const today = new Date()
    if (date.getFullYear() != today.getFullYear())
      return date.toLocaleTimeString(['hu-HU'], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    else if (date.getDay() != today.getDay())
      return date.toLocaleTimeString(['hu-HU'], { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    else
      return date.toLocaleTimeString(['hu-HU'], { hour: '2-digit', minute: '2-digit' });
    }
  }
