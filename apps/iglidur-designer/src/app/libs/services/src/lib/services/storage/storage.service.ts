import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  getItem<T>(key: string): T | null {
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

  setItem<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      this.storage.setItem(key, value);
    } else {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}