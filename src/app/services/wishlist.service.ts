import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  constructor(private http: HttpClient) {}

  getWishlistByUserId(userId: string): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(`http://localhost:3000/items`);
  }

  addItem(item: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>('http://localhost:3000/items', item);
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/items/${itemId}`);
  }
}
