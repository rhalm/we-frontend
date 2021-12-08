import { Component, Input } from '@angular/core'
import { Conversation } from '../../models/conversation.type'
import { Router } from '@angular/router'

/**
 * Preview of a conversation: shows title, short part of the last message and
 * the other participant
 */
@Component({
  selector: 'member-conv-preview',
  templateUrl: './conv-preview.component.html',
  styleUrls: ['./conv-preview.component.css']
})
export class ConvPreviewComponent {
  @Input() preview: Conversation

  constructor(private router: Router) { }

  // when clicked, navigate to conversation's page
  open = () => this.router.navigate(['messages/' + this.preview.id])
}
