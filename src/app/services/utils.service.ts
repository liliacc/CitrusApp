import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  findObjectInArray(dataArray: any[], searchedText: string, atributeName: string): any {
    for (const dataItem of dataArray) {
      if (searchedText === dataItem[atributeName]) {
        return dataItem;
      }
    }
  }
}
