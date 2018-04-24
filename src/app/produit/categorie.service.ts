import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICategorie } from './categorie';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategorieService {
  private baseUrl = 'api/categories';

  constructor(private _http: HttpClient) { }
    obtenirCategories(): Observable<ICategorie[]> {
      return this._http.get<ICategorie>(this.baseUrl)
          .do(data => console.log('obtenirCategories: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote loggiing infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    return Observable.throw(err.message);
  }

}
