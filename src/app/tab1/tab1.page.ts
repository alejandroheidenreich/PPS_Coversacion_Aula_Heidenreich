import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public selectedIdioma: string = "";
  public selectedTema: string = "";
  public audio: HTMLAudioElement = new Audio();

  constructor(private auth: AuthService) { }
  ngOnInit(): void {

  }

  selectIdioma(idioma: string) {
    this.selectedIdioma = idioma;
  }

  selectTema(tema: string) {
    this.selectedTema = tema;
  }

  play(select: string) {
    console.log(select);
    this.audio.pause();
    this.audio = new Audio(`assets/audios/${select}_${this.selectedIdioma}.mp3`);
    this.audio.play()
  }



  logOut() {
    setTimeout(() => {

      this.auth.logout();
    }, 3000);
  }

}
