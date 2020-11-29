import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.styl']
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  constructor() { }

  ngOnInit() {
    console.error(this.message);
  }

}
