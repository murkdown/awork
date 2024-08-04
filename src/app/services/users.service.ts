import { Injectable } from '@angular/core';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/api-result.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://randomuser.me/api';

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
  }

  /**
   * Fetches 5000 mock users from the api
   * @param {number} page
   * @returns {Observable<User[]>}
   */
  getUsers(page: number = 1, quantity: number = 5000): Observable<User[]> {
    const cachedResponse = this.storageService.getUsers();
    if (cachedResponse.length) {
      return of(cachedResponse);
    }

    return this.requestUsers(quantity, page).pipe(shareReplay(1));
  }

  private requestUsers(quantity: number, page: number) {
    return this.httpClient
      .get<ApiResult>(`${this.apiUrl}?results=${quantity}&seed=awork&page=${page}`)
      .pipe(map(apiResult => User.mapFromUserResult(apiResult.results)), tap(this.storageService.setUsers))
  }
}
