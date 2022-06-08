import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemeObject } from 'src/models/MemeObject';

@Injectable({
  providedIn: 'root'
})
export class MemesService {

  constructor(private httpClient: HttpClient) { }


  getMemesList() {
    return this.httpClient.get<MemeObject>("https://api.imgflip.com/get_memes");
  }

}
