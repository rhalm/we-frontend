import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ConversationCreation } from '../models/conversation-creation.type'
import { Pageable } from '../../../shared/models/pageable.type'
import { Conversation } from '../models/conversation.type'
import { Observable } from 'rxjs'
import { Message } from '../models/message.type'

/**
 * Service responsible for managing messages and conversations
 */
@Injectable()
export class MessagingService {

  constructor(private http: HttpClient) { }

  // sends post request with new conversation
  createConversation(conv: ConversationCreation) {
    conv.firstMessage = conv.firstMessage.trim()
    return this.http.post('api/messaging', conv)
  }

  // sends get request with pagination parameters
  getConversations(size, page): Observable<Pageable<Conversation>> {
    let params = new HttpParams()

    // pagination
    if (size) params = params.set('size', size)
    if (page) params = params.set('page', page)
    params = params.set('sort', 'conversation.lastMessage.createdAt,DESC') // newest first
    return this.http.get<Pageable<Conversation>>('/api/messaging', { params })
  }

  // sends get request with conversation id to get messages that belong to it
  getMessages(id): Observable<Pageable<Message>> {
    let params = new HttpParams()
    params = params.set('sort', 'createdAt,DESC')
    return this.http.get<Pageable<Message>>('/api/messaging/' + id + '/messages', { params })
  }

  // sends get request to get information about a conversation
  getConversation(id): Observable<Conversation> {
    return this.http.get<Conversation>('/api/messaging/' + id)
  }

  // sends post request to create a new message in a conversation
  sendMessage(id, content): Observable<Message> {
    return this.http.post<Message>('/api/messaging/' + id, { content: content.trim() })
  }
}
