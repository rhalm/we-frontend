import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Profile } from '../../../../shared/models/profile.type'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MessagingService } from '../../services/messaging.service'

/**
 * Used as a dialog to create new conversation
 */
@Component({
  selector: 'member-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['./create-conversation.component.css']
})
export class CreateConversationComponent implements OnInit {
  formGroup: FormGroup
  sent: boolean = false

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Profile, // the recipient
    private formBuilder: FormBuilder,
    private service: MessagingService) { }

  // create form with validators and load sample message
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'title': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      'content': [null, [Validators.maxLength(500)]]
    })
    this.formGroup.controls['content'].setValue(
      'Hi ' + this.data.username + '!\n\n')
  }

  // send data to MessagingService then handle the response
  onSubmit(post) {
    this.service.createConversation({
      receiverId: this.data.userId,
      title: post.title,
      firstMessage: post.content
    }).subscribe(_ => {
      this.sent = true
      setTimeout(() => this.dialogRef.close(), 500) // close the dialog after it is sent with some delay
    }, error => console.log(error))

  }

}
