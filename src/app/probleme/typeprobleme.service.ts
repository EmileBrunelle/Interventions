import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITypeProbleme } from "./typeprobleme";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

export class TypeProblemeService {
    private baseUrl = 'api/typeprobleme';
  
    constructor(private _http: HttpClient) { }
      obtenirTypesProblemes(): Observable<ITypeProbleme[]> {
        return this._http.get<ITypeProbleme>(this.baseUrl)
            .do(data => console.log('obtenirTypesProblemes: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
  
    private handleError(err: HttpErrorResponse) {
      // in a real world app, we may send the server to some remote loggiing infrastructure
      // instead of just logging it to the console
      console.error(err.error);
      return Observable.throw(err.message);
    }
  
  }