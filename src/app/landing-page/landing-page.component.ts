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
  
  constructor(
    public envVars: GlobalsService,
    public router: Router,
    public globals: GlobalsService
  ) { }

  ngOnInit() {
    this.newUser();
  }


  //call when a user hits landing page
  newUser(){
    
    $.ajax({
      url: this.globals.getApiUrl() + "new-user",
      method: "GET",
      crossDomain : true,
      xhrFields: { withCredentials: true },
      success: function (result) {
        console.log("Created Session");
      },
      error: function (result) {
        console.log("Something went wrong");
        console.log(result);
      }
    });
  }

  /*
  * Sends pin to servlet
  */
  joinLobby() {
    var pin = $('#pin').val();
    console.log(pin);
    $.ajax({
      url: "/connect-to-lobby",
      method: "POST",
      data: {pin},
      success: function(response){
        //TODO
      },
      error: function(response){
        alert("There was a problem connecting to lobby...");
      }
    });
  }

  pickCategory(cat){
    this.globals.setCategory(cat);
    this.router.navigate(['/select-lobby']);
  }

  //This logic will happen on a different page
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