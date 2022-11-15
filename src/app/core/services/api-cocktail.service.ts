import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cocktail} from "../interfaces/cocktail.interface";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ApiCocktailService {
  private readonly baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getCocktails(): Observable<Cocktail[]> {
    const url = `${this.baseUrl}/cocktails`;

    return this.http.get<Cocktail[]>(this.baseUrl);
  }

  addCocktail(payload: any): Observable<Cocktail> {
    const url = `${this.baseUrl}/cocktails`;

    return this.http.post<Cocktail>(url, payload, httpOptions);
  }
}
