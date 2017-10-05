import {Injectable} from '@angular/core';

@Injectable()
export class LocalstorageService {

  public notEmpty(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public clearData(key: string) {
    localStorage.removeItem(key);
  }

  public setAndGet(key: string, data: any) {
    this.setData(key, data);
    return this.getData(key);
  }

  public pushToStorage(key: string, data: any) {
    let storedData = this.getData(key);
    storedData.push(data);
    this.setData(key, data);
  }

  public removeItemFromStorage(key: string, itemToRemove: any): boolean {
    let data = this.getData(key);
    if (!data) return false;
    let foundItem = data.find(x => x == itemToRemove);
    if (!foundItem)
      return false;
    let filteredData = data.filter(x => x != foundItem);
    this.setData(key, filteredData);
    return true;
  }

  public getData(key: string): any {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : null;
  }
}
