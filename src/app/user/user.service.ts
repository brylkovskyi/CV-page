import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserdata(userId) {
    return this.db.doc('users/' + userId).snapshotChanges();
  }

  getUsersList() {
    return this.db.doc('users/userslist').snapshotChanges();
  }

  createUser(user) {
    return this.db.collection('users').add(user);
  }

  addToUserList(userList) {
    return this.db.doc('users/userslist').update(userList);
  }

  updateUser(user) {
    delete user.id;
    this.db.doc('users/' + user.id).update(user);
  }

  deleteUser(userId: string) {
    this.db.doc('users/' + userId).delete();
  }

  constructor(private db: AngularFirestore) {
  }

}

