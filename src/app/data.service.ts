import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap, tap} from 'rxjs/operators';
import {Subject, of, Observable, from} from 'rxjs';
import {UserData} from '../assets/user-mock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFirestore) {
  }

  activeField = new Subject();
  usersList;

  getUserdata(userId) {
    const userFromList = (data) => {
      this.usersList = data.payload.data();
      let user = null;
      Object.keys(data.payload.data()).forEach(key => {
        if (key === userId) {
          user = data.payload.data()[key];
        }
      });
      if (user) {
        return this.db.doc('users/' + user).valueChanges();
      } else {
        return this.createUser(UserData, userId);
      }
    };

    return this.getUsersList().pipe(
      switchMap(list => userFromList(list)));
  }

  getUsersList() {
    return this.db.doc('users/userslist').snapshotChanges();
  }

  createUser(user, userId) {
    const addUserObservable = from(this.db.collection('users').add(user));

    return addUserObservable.pipe(
      tap(data => {
        this.usersList[userId] = data.id;
      }),
      switchMap(() => this.addToUserList(this.usersList)),
      switchMap(() => this.db.doc('users/' + this.usersList[userId]).valueChanges())
    );
  }

  addToUserList(userList) {
    return this.db.doc('users/userslist').update(userList);
  }

  updateUser(userId, userData) {
    return this.getUsersList().pipe(
      switchMap(usersList =>
        this.db.doc('users/' + usersList.payload.data()[userId]).update(userData)
      ));
  }

  deleteUser(userId: string) {
    this.db.doc('users/' + userId).delete();
  }

}

