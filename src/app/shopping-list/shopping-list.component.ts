import { Component, OnInit } from '@angular/core';
import {Item} from "../model/item";
import {ITEMS} from "../model/mock-items";
import {ShoppingListService} from "../services/shopping-list.service";
import {Observable, of} from "rxjs";
import {AngularFirestoreDocument, DocumentData} from "@angular/fire/compat/firestore";
import {AngularFireStorageReference} from "@angular/fire/compat/storage";
import {fireDocToItem} from "../converter/item.converter";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  nextId: number;
  items: Item[];
  selectedItem?: Item;

  newItemName: string = null;

  constructor(private shoppingListService: ShoppingListService) {
    this.items = [];
  }

  ngOnInit(): void {
    this.getAllItems();
    console.log('ITEMS ' + this.items);
  }

  onSelectItem(item: Item): void {
    if (this.selectedItem === item) {
      this.selectedItem = undefined;
    }
    else {
      this.selectedItem = item;
    }
  }

  getAllItems() {
    this.shoppingListService.getItemsOfUser().subscribe((querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc: DocumentData) => {
        console.log(doc.id, " => ", doc.data());
        list.push(fireDocToItem(doc));
      });
      this.items = list;
    });
  }

  addNewItem(): void {
    if ( this.newItemName) {
      let newItem = new Item('default', this.newItemName);
      this.shoppingListService.addItemToUser(newItem);
      this.newItemName = null;
      this.getAllItems();
    }
  }

  removeItem(item: Item): void {
    this.shoppingListService.deleteItemOfUser(item.id);
    this.getAllItems();
    console.log('on remove', item);
  }

}
