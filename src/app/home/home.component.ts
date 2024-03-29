import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    user: any;

    constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
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
    }
}
