import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable, Subject } from 'rxjs'
import { SignInInfo } from 'src/modules/guest/models/signin-info.type'
import { SignUpInfo } from 'src/modules/guest/models/signup-info.type'
import { AuthResponse } from '../models/auth-response.type'
import { ProfileCreate } from '../models/profile-create.type'

/**
 * Responsible for user authentication
 */
@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth) {
    firebaseAuth.onIdTokenChanged((user) => {
      if (user) {
        firebaseAuth.currentUser
          .then(user => user.getIdToken(true))
          .then(token => localStorage.setItem("token", token))
      } else {
        localStorage.removeItem("token")
      }
    })

    firebaseAuth.onAuthStateChanged((user) => {
      if (user) localStorage.setItem("userId", user.uid)
      else localStorage.removeItem("userId")
    });
  }

  // check from localStorage if user is logged in
  isLoggedIn(): boolean { return localStorage.getItem('token') != null }

  getToken() {
    return localStorage.getItem("token")
  }

  signIn(info: SignInInfo) {
    const result = new Subject<AuthResponse>()

    this.firebaseAuth.fetchSignInMethodsForEmail(info.email)
      .then((signInMethods) => {
        if (signInMethods.length) {
          // The email exists -> try to sign in
          this.firebaseAuth.signInWithEmailAndPassword(info.email, info.password)
            .then(
              _ => result.next({ successful: true }),
              _ => result.next({ successful: false, message: "Incorrect password" }))
        } else {
          // Email not found
          result.next({ successful: false, message: "User does not exist" })
        }
      })
      .catch(_ => result.next({ successful: false, message: "Something went wrong" }))

    return result.asObservable()
  }

  signUp(info: SignUpInfo): Observable<any> {
    const result = new Subject<AuthResponse>()

    this.firebaseAuth.fetchSignInMethodsForEmail(info.email)
      .then((signInMethods) => {
        if (signInMethods.length) {
          // The email already exists
          result.next({ successful: false, message: "Email already exists" })
        } else {
          this.firebaseAuth.createUserWithEmailAndPassword(info.email, info.password)
            .then(_ => {
                this.firebaseAuth.currentUser.then(_ => {
                  (async () => {
                    await new Promise(f => setTimeout(f, 500));
                    this.createProfile({username: info.username})
                      .subscribe(
                        _ => {
                          result.next({ successful: true })
                        },
                        _ => {
                          // If profile creation is unsuccessful then delete firebase user
                          this.firebaseAuth.currentUser.then(user => user.delete())
                          result.next({ successful: false })
                        }
                      )
                  })();
                })
              },
              _ => result.next({ successful: false, message: "Something went wrong" })
            )
        }
      })
      .catch(_ => result.next({ successful: false, message: "Something went wrong" }))

    return result.asObservable()
  }


  createProfile(profile: ProfileCreate) {
    const profileBlob = new Blob([JSON.stringify(profile)], { type: 'application/json' })

    const formData = new FormData()
    formData.append('model', profileBlob)

    return this.http.post('/api/profile', formData, { observe: 'response' })
  }

  logout() {
    this.firebaseAuth.signOut()
    window.location.reload()
  }
}
