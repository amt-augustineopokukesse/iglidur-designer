import { Injectable } from '@angular/core';
import { StorageKeys } from '@iglidur-designer/interfaces';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  getItem<T>(key: StorageKeys): T | null {
    const item = this.storage.getItem(key);
    if (item === null) {
      return null;
    }
    try {
      return JSON.parse(item);
    } catch {
      return item as unknown as T;
    }
  }

  setItem<T>(key: StorageKeys, value: T): void {
    if (typeof value === 'string') {
      this.storage.setItem(key, value);
    } else {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: StorageKeys): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}