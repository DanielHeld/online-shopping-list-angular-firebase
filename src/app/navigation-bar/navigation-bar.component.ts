import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  user: Observable<any>;

  constructor(public afAuth: AngularFireAuth, private auth: AuthService, private firestore: AngularFirestore) {
    this.user = null;
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

      if (user) {
        let emailLower = user.email.toLowerCase();
        this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
      }
    });
  }

  logout(): void {
    this.afAuth.signOut();
    this.user = null;
  }

}
