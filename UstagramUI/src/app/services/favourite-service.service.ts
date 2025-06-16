import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourite } from '../interfaces/favourite';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteServiceService {

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  private apiUrl = 'http://localhost:5266/api/Favourites/'

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  addFavourite(f: Favourite): Observable<string>{
    return this.http.post<string>(this.apiUrl + `CreateFavourite`, f);
  }

  deleteFavourite(id: string): Observable<string>{
    return this.http.delete<string>(this.apiUrl + `DeleteFavourite/${id}`)
  }

  getAllFavourites(): Observable<Favourite[]>{
    return this.http.get<Favourite[]>(this.apiUrl + `GetFavourites`);
  }

  getMyFavourites(): Observable<Favourite[]>{
    return this.http.get<Favourite[]>(this.apiUrl + `GetMyFavourites/my`)
  }
}
