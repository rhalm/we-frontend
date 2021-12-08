import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Profile } from '../models/profile.type'
import { ProfileUpdate } from '../../modules/member/models/profile-update.type'


/**
 * Service responsible for managing profiles
 */
@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  // get profile for a user
  getProfileByUser(userId: string): Observable<Profile> {
    return this.http.get<Profile>('api/profile/public/user/' + userId)
  }

  // get profile from profile id
  getProfile(id: string): Observable<HttpResponse<Profile>> {
    return this.http.get<Profile>('api/profile/public/' + id, { observe: 'response' })
  }

  // get logged in user's profile
  getMyProfile(): Observable<Profile> {
    return this.http.get<Profile>('api/profile/me')
  }

  // send put request to update profile
  updateProfile(profile: ProfileUpdate, file: File): Observable<HttpResponse<any>> {
    const profileBlob = new Blob([JSON.stringify(profile)], { type: 'application/json' })

    let formData = new FormData()
    formData.append('model', profileBlob)
    formData.append('file', file)

    return this.http.put('api/profile/me', formData, { observe: 'response' })
  }
}
