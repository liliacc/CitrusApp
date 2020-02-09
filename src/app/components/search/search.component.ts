import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {
  searchedText = '';

  @Input() dataArray: any[];
  @Input() atributeName: string;

  @Output() foundObject = new EventEmitter();
  constructor(private utils: UtilsService) { }

  onEnterPress() {
    console.error('ārray', this.dataArray);
   const foundObject = this.utils.findObjectInArray(this.dataArray, this.searchedText, this.atributeName);
   if (foundObject !== null && foundObject !== undefined) {
     this.foundObject.emit(foundObject);
   }
  }
  ngOnInit() {
  }
}
