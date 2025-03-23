import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Item } from '../../models/item.model';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [MatCardModule, MatButtonModule],
})
export class MainComponent implements OnInit {
  userId = '1';
  items: Array<Item> = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlistByUserId(this.userId).subscribe((items) => {
      console.log('Items', items);
      this.items = items;
    });
  }

  addItem(item: Omit<Item, 'id'>): void {
    this.wishlistService.addItem(item).subscribe((newItem) => {
      this.items.push(newItem);
    });
  }

  editItem(item: Item): void {
    // this.wishlistService.editItem(item).subscribe((updatedItem) => {
    //   const index = this.items.findIndex((i) => i.id === updatedItem.id);
    //   this.items[index] = updatedItem;
    // });
  }

  deleteItem(itemId: string): void {
    this.wishlistService.deleteItem(itemId).subscribe(() => {
      this.items = this.items.filter((i) => i.id !== itemId);
    });
  }
}
