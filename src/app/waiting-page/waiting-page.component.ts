import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { StompService } from '@stomp/ng2-stompjs';
import { Message, StompHeaders } from '@stomp/stompjs';
import { Subscription, Observable } from 'rxjs';

import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.scss']
})
export class WaitingPageComponent implements OnInit, OnDestroy,   AfterViewInit {

  users: String[] = ['Player1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'];

  // Stream of messages
  private data_subscription: Subscription;
  public data_observable: Observable<Message>;

  private _stompService: StompService;

  // Subscription status
  public subscribed = false;

  StompConfig = {
    url: 'ws://127.0.0.1:8080/TriviaTownesServer/join-waiting-lobby',
    headers: {},
    heartbeat_in: 0, // Typical value 0 - disabled
    heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
    reconnect_delay: 0,
    debug: true // Will log diagnostics on console
  };

  connect() {
    this._stompService = new StompService(this.StompConfig);
    this._stompService.initAndConnect();

    this.data_observable = this._stompService.subscribe('/lobbies-hash/' + this.globals.getCategory().toLowerCase() + '/get-lobby-data');
    this.data_subscription = this.data_observable.subscribe(this.onDataUpdate);
    this.subscribed = true;

    this.startPingingServer(this);
  }


  constructor(
    public router: Router,
    public globals: GlobalsService
  ) { }

  ngOnInit() {


  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
    this.unsubscribe();
  }

  rerender(): void {

    console.log('before render');
    const self = this;

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  public unsubscribe() {
    if (!this.subscribed) {
      return;
    }
    this.data_subscription = null;
    this.data_observable = null;
    this.subscribed = false;
  }


}
