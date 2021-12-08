import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AdCreation } from '../../modules/member/models/ad-creation.type'
import { AdThumbnail } from '../../modules/app/models/ad-thumbnail.type'
import { Pageable } from '../models/pageable.type'
import { Ad } from '../../modules/app/models/ad.type'

/**
 * Service responsible for managing ads
 */
@Injectable()
export class FeedService {
  private readonly categories: string[]

  constructor(private http: HttpClient) {
    // default categories
    this.categories = ['Storage', 'Clothing', 'Entertainment', 'Electronics', 'Furniture', 'Sports', 'Beauty', 'Other']
  }

  // query ads, add query params from options
  getAds(options: any): Observable<HttpResponse<Pageable<AdThumbnail>>> {
    let params = new HttpParams()
    if (options.searchTerm) params = params.set('searchTerm', options.searchTerm)
    if (options.locations) params = params.set('locations', options.locations.toString())
    if (options.categories) params = params.set('categories', options.categories.toString())
    if (options.withImageOnly) params = params.set('withImageOnly', String(options.withImageOnly))
    if (options.userId) params = params.set('userId', options.userId)

    params = params.set('sort', 'createdAt,DESC') // newest first

    // pagination
    if (options.size) params = params.set('size', options.size)
    if (options.page) params = params.set('page', options.page)

    return this.http.get<Pageable<AdThumbnail>>('/api/feed/public/', { params: params, observe: 'response' })
  }

  // get information about an ad
  getAd(id: string): Observable<HttpResponse<Ad>> {
    return this.http.get<Ad>('/api/feed/public/' + id, { observe: 'response' })
  }

  getCategories(): string[] {
    return this.categories
  }

  // get available locations from backend
  getLocations(): Observable<string[]> {
    return this.http.get<string[]>('api/feed/public/locations')
  }

  // send post request with the provided adcreation model and file
  createAd(model: AdCreation, file: File): Observable<HttpResponse<Ad>> {
    const jsonString = JSON.stringify(model)
    const adBlob = new Blob([jsonString], { type: 'application/json' })

    const formData = new FormData()
    formData.append('model', adBlob)
    formData.append('file', file)

    return this.http.post<Ad>('/api/feed', formData, { observe: 'response' })
  }

  // send put request to update ad with the given id
  updateAd(id: string, ad: AdCreation, file: File) {
    const adBlob = new Blob([JSON.stringify(ad)], { type: 'application/json' })
    const formData = new FormData()
    formData.append('model', adBlob)
    if (file != null) formData.append('file', file)

    return this.http.put('/api/feed/' + id, formData, { observe: 'response' })
  }

  // delete an ad with the given id
  delete(id: string) {
    return this.http.delete('/api/feed/' + id)
  }
}
