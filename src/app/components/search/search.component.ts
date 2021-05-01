import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {
  searchedText = '';
  searchUser = true;
  @Input() dataArray: any[];
  @Input() atributeName: string;
  @Output() foundObject = new EventEmitter();
  constructor(private utils: UtilsService, public messagingService: MessagingService) { }

  onEnterPress() {
    this.searchUser = false;
    const foundObject = this.utils.findObjectInArray(this.dataArray, this.searchedText, this.atributeName);
    if (foundObject !== null && foundObject !== undefined) {
      // this.messagingService.foundOtherUser = true;
      this.foundObject.emit(foundObject);
   }
  }
  ngOnInit() {
  }
}
