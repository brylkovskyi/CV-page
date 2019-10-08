import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {Subject, of} from 'rxjs';

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
        return of(false);
      }
    };

    return this.getUsersList().pipe(
      switchMap(list => userFromList(list)));
  }

  getUsersList() {
    return this.db.doc('users/userslist').snapshotChanges();
  }

  createUser(user, userId) {
    this.db.collection('users').add(user).then(data => {
      this.usersList[userId] = data.id;
      this.addToUserList(this.usersList).then(() => console.log('new entry'));
    });
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

