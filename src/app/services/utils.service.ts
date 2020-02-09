import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  findObjectInArray(dataArray: any[], searchedText: string, atributeName: string): any {
    console.log(dataArray);
    for (let dataItem of dataArray) {
      console.log('DATAITEM', dataItem);
      if (searchedText === dataItem[atributeName]) {
        return dataItem;
      }
      console.log('nukk');
    }
  }
}
