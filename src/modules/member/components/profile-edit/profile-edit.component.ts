import { Component, OnInit } from '@angular/core'
import { Profile } from '../../../../shared/models/profile.type'
import { ProfileService } from '../../../../shared/services/profile.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ProfileUpdate } from '../../models/profile-update.type'
import { Location } from '@angular/common'

/**
 * Profile editing component
 */
@Component({
  selector: 'member-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  private readonly MAX_BYTES = 1048576
  readonly maxSizeStr = '1 Mb'

  loaded = false
  found = false
  profile: Profile
  saved = false
  errorSaving = false
  formGroup: FormGroup


  constructor(
    private service: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location) { }

  // get profile from ProfileService and handle response
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.getProfile(params['id'])
        .subscribe(result => {
          this.profile = result.body
          this.loaded = true
          this.found = true
          this.createForm()
        }, error => {
          if (error.status == 404 || error.status == 400)
            this.loaded = true // it is loaded but not found, so it will show that instead of loading
          else
            console.log(error)
        })
    })
  }

  // create form and set original values
  createForm() {
    this.formGroup = this.formBuilder.group({
      'introduction': [null, [Validators.maxLength(100)]]
    })
    this.formGroup.controls['introduction'].setValue(this.profile.introduction)
    if (this.profile.image)
      this.imageSrc = this.profile.image
  }

  // send data to ProfileService and handle response
  onSubmit() {
    this.saved = true
    const profileUpdate = new ProfileUpdate()
    profileUpdate.introduction = this.formGroup.controls['introduction'].value

    this.service.updateProfile(profileUpdate, this.fileToUpload)
      .subscribe(_ => this.saved = true,
        _ => this.errorSaving = true)
      .add(() => setTimeout(() => this.location.back(), 500)) // navigate back to last page
  }

  // navigate back to last page
  cancel = () => this.location.back()

  isFileTooBig: boolean = false
  imageSrc: string
  fileToUpload

  // handles when a new image is chosen
  onFileChange(event) {
    const reader = new FileReader()

    // remove the current file
    this.imageSrc = ''
    this.fileToUpload = null

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files

      // if file is too big, it will show an error message
      this.isFileTooBig = (file.size > this.MAX_BYTES)
      if (!this.isFileTooBig) {
        reader.readAsDataURL(file)

        // load file in the file preview section
        reader.onload = () => this.imageSrc = reader.result as string

        this.fileToUpload = file
      }
    }
  }
}
