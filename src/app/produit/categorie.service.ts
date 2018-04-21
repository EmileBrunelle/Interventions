import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategorieService {

  constructor(private _http: HttpClient) { }

}
