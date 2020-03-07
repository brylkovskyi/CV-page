import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {filter, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {Subject, from, throwError} from 'rxjs';
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
    return this.getUsersList().pipe(
      tap(usersList => {
        if (Object.keys(usersList.payload.data()).length > 0) {
          this.usersList = usersList.payload.data();
        }
      }),
      filter(usersList => Object.keys(usersList.payload.data())[0] === userId),
      map(item => item ? item[userId] : this.createUser(UserData)),
      switchMap(firebaseId => this.db.doc('users/' + firebaseId).snapshotChanges())
    );
  }

  getUsersList() {
    return this.db.doc('users/userslist').snapshotChanges();
  }

  createUser(userId) {
    const mockedUserData = UserData;
    mockedUserData.id = userId;
    let firebaseId = null;
    let firebaseUserData;
    return this.getUsersList().pipe(
      mergeMap(item => Object.keys(item.payload.data()).includes(userId) ?
        throwError('user already exists') : from(this.db.collection('users').add(mockedUserData))
      ),
      take(1),
      tap(receivedUserData => {
        firebaseUserData = receivedUserData;
        firebaseId = receivedUserData.id;
      }),
      switchMap(() => this.addToUserList(firebaseId, userId)),
      switchMap(() => from(firebaseUserData.get())),
      map((data: DocumentSnapshot<{}>) => data.data())
    );
  }

  addToUserList(firebaseId, userId) {
    const usListItem = {};
    usListItem[userId] = firebaseId;
    return this.db.doc('users/userslist').set(usListItem, {merge: true});
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

