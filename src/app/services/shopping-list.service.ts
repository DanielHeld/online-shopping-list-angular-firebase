import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {Item} from "../model/item";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  user: Promise<any>;
  email: string;

  constructor(private authService: AuthService, private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.authService.getCurrentUser().then( user => {
      if (user) {
        this.email = user.email.toLowerCase();
      }
    });
  }

  addItemToUser(item: Item) {
    this.authService.getCurrentUser().then( user => {
      if (user) {
        let emailLower = user.email.toLowerCase();
        this.afs.collection('users').doc(emailLower).collection('shopping-list').add(
          {
            name: item.name
          }
        ).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error.message);
        })
    }
    });
  }

  getItemsOfUser(): Observable<any>{
    return this.afs.collection('users').doc(this.email)
      .collection('shopping-list').get();
  }

  deleteItemOfUser(id: string): void {
    this.afs.collection('users').doc(this.email)
      .collection('shopping-list')
      .doc(id).delete()
       .then(() => {
           console.log("Document deleted with ID: ", id);
       })
       .catch((error) => {
         console.error("Error deleting document: ", error.message);
       })
  }
}
