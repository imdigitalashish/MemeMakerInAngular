import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Meme } from 'src/models/meme';
import { MemesService } from '../memes.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(private mems: MemesService, private navigator: Router) { }



  listOfMemes: Meme[] = [];

  ngOnInit(): void {
    this.mems.getMemesList().subscribe((res) => {
      this.listOfMemes = res.data.memes;
    });
  }



  selectAMeme(index: any) {

    let selectedMemeObject = this.listOfMemes[index];
    const navigationExtras: NavigationExtras = {
      state: selectedMemeObject,
    }
    this.navigator.navigate(["meme"], navigationExtras);

  }

}
