import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public setItem(key: string, data: any) {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return data;
  }

  public getItem(key: string): any {
    const data = localStorage.getItem(key);
    const parsed = JSON.parse(data);
    return parsed;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
