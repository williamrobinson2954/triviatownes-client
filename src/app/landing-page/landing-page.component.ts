import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  categories = ['Science', 'Art', 'History', 'Sports', 'Nature', 'Geo', 'Cars', 'Lit', 'New'];

  username: String;
  game_key: String;


  constructor(
    public envVars: GlobalsService,
    public router: Router,
    public globals: GlobalsService
  ) { }

  ngOnInit() {
    this.playAudio();
    this.newUser();
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/Users/michaelcraig/Documents/revP2/triviatownes-client/src/audio/Price-is-right-losing-horn.mp3';
    audio.load();
    audio.play();
  }


  // call when a user hits landing page
  newUser() {

    $.ajax({
      url: this.globals.getApiUrl() + 'new-user',
      method: 'GET',
      crossDomain: true,
      xhrFields: { withCredentials: true },
      success: function (result) {
        console.log('Created Session');
      },
      error: function (result) {
        console.log('Something went wrong');
        console.log(result);
      }
    });
  }

  /*
  * Sends pin to servlet
  */
  joinLobby() {

    const self = this;

    if(!(this.username && this.game_key)){
      alert('Please enter a username and password!');
      return;
    }

    $.ajax({
      url: self.globals.getApiUrl() + '/join-waiting',
      method: 'POST',
      data: {
        lobbyKey: self.game_key,
        username: self.username
       },
       crossDomain: true,
       xhrFields: { withCredentials: true },
       success: function (res) {
         console.log(res);
         self.globals.setLobbyKey(res['lobbyId']);
         self.globals.setUsername(res['userId']);
         self.globals.setUsername(self.username);
         self.globals.setUserId(res['userId']);
         self.globals.setGameCategory(res['category']);
         self.globals.setLobbyQuestions(res['questions']);
         self.globals.setLobbyName(res['lobbyName']);
         self.router.navigate(['waiting']);
       },
       error: function (res) {
         console.log('error....');
         console.log(res);
         alert('game session is full or does not exist, please pick another lobby....');
       }
    });
  }

  selectCategory(cat) {
    this.globals.setCategory(cat);
    this.router.navigate(['/server-lobby']);
  }

  // This logic will happen on a different page
  /*
  pickCategory(cat) {

    //Needed to refrence this object insidee of ajax callbacks
    var self = this;

    console.log("picking category " + cat);
    $.ajax({
      url: "selectLobby",
      method: "POST",
      data: {
        category: cat
      },
      success: function(response){
        self.globals.setCategory(cat);
        self.router.navigate(['/select-lobby']);
      },
      error: function(response){
        alert("There was a problem loading server list...");
      }
    });
  }
  */
}
