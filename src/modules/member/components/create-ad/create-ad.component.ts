import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AdCreation } from '../../models/ad-creation.type'
import { FeedService } from '../../../../shared/services/feed.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Ad } from '../../../app/models/ad.type'
import { Location } from '@angular/common'

/**
 * Used for creating and updating an ad
 * Has a form, user can upload images and then if everything's valid
 * then it sends the data to FeedService
 */
@Component({
  selector: 'member-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {
  formGroup: FormGroup
  categoryList: string[] = this.service.getCategories()

  ad: Ad = null
  selectedCategory = new FormControl()

  success: boolean = false
  isFileTooBig: boolean = false
  imageSrc: string
  fileToUpload: File = null
  readonly maxSizeStr = '10 Mb' // readable form
  private readonly MAX_BYTES = 10485760 // for the image

  constructor(private formBuilder: FormBuilder,
              private service: FeedService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  // if ad id was provided then get information about it from feedService
  // and load ad into the form
  // otherwise create an empty form
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']
      if (id != null)
        this.service.getAd(id)
          .subscribe(result => {
            this.ad = result.body
            this.createForm()
            this.formGroup.controls['title'].setValue(this.ad.title)
            this.formGroup.controls['description'].setValue(this.ad.description)
            this.formGroup.controls['location'].setValue(this.ad.location)
            if (this.ad.images.length > 0) this.imageSrc = this.ad.images
          })
      else
        this.createForm()
    })
  }

  // create form with validators
  createForm() {
    this.formGroup = this.formBuilder.group({
      'title': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      'description': [null, [Validators.maxLength(500)]],
      'location': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    })
  }

  // checks form validity
  isValid() {
    return this.formGroup.valid
      && !this.isFileTooBig
      && (this.ad != null // if ad was preloaded then category checks are not needed as user cannot modify that
        || this.selectedCategory.value != null)
  }

  sent = false

  // sends data to FeedService
  onSubmit() {
    let ad: AdCreation = this.getAdCreation()
    if (this.ad == null) // if ad is being updated
      this.service.createAd(ad, this.fileToUpload)
        .subscribe(
          _ => {
            this.success = true // if successful: inform user and then navigate to home page with a delay
            setTimeout(() => this.router.navigate(['/']), 500)
          },
          _ => this.success = false // otherwise show error message
        ).add(() => this.sent = true)
    else
      this.service.updateAd(this.ad.id, ad, this.fileToUpload)
        .subscribe(_ => {
            this.success = true // if successful: inform user and then navigate to the last page with a delay
            setTimeout(() => this.location.back(), 500)
          },
          _ => this.success = false // otherwise show error message
        ).add(() => this.sent = true)
  }

  // create and return the new ad
  getAdCreation(): AdCreation {
    let ad = new AdCreation()
    ad.title = this.formGroup.controls['title'].value
    ad.description = this.formGroup.controls['description'].value
    ad.location = this.formGroup.controls['location'].value
    if (this.ad == null) ad.category = this.selectedCategory.value

    return ad
  }

  // if the image changes: validate and reload
  onFileChange(event) {
    const reader = new FileReader()

    // remove the current file
    this.imageSrc = ''
    this.fileToUpload = null

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      this.isFileTooBig = (file.size > this.MAX_BYTES) // check size
      if (!this.isFileTooBig) {
        reader.readAsDataURL(file)
        reader.onload = () => this.imageSrc = reader.result as string // update preview

        this.fileToUpload = file // update file that will be sent to FeedService
      }
    }
  }

  // if edit is being cancelled, go back to last page
  cancel = () => this.location.back()
}
