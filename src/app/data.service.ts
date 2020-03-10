import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {map, switchMap, take} from 'rxjs/operators';
import {Subject, from, throwError, forkJoin, of, Observable} from 'rxjs';
import {UserData} from '../assets/user-mock';
import {User} from './shared/user-interface';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: AngularFirestore, private authService: AuthService) {
  }

  activeField = new Subject();

  getUserData(userId): Observable<any> {
    return this.getIdFromUsersList(userId).pipe(
      switchMap(idFromUsersList => idFromUsersList ?
        this.db.doc('users/' + idFromUsersList).snapshotChanges().pipe(map(data => data.payload.data() as User)) :
        this.checkUserRights(userId).pipe(
          switchMap(isAble => isAble ? this.createUser(userId) : of(null)))
      ));
  }

  getUsersList() {
    return this.db.doc('users/userslist').snapshotChanges();
  }

  getIdFromUsersList(userId) {
    return this.getUsersList().pipe(
      switchMap(item => Object.keys(item.payload.data()).includes(userId) ? of(item.payload.data()[userId]) : of(null))
    );
  }

  checkUserRights(userIdFromRoute) {
    return this.authService.authStatusChecker().pipe(
      switchMap(user => of(user.uid === userIdFromRoute))
    );
  }

  createUser(userId): Observable<User> {

    UserData.id = userId;
    return this.checkUserRights(userId).pipe(
      switchMap(isAble => isAble ? this.getIdFromUsersList(userId) : throwError('You don\'t have right\'s to do this.')),
      switchMap(item => item ? throwError('User already exists') : from(this.db.collection('users').add(UserData))),
      take(1),
      switchMap((receivedUserData) =>
        forkJoin([this.addToUserList(receivedUserData.id, userId), receivedUserData.get()])
      ),
      map((data: [void, DocumentSnapshot<User>]) => data[1].data())
    );
  }

  addToUserList(firebaseId, userId) {
    const usListItem = {};
    usListItem[userId] = firebaseId;
    return this.db.doc('users/userslist').set(usListItem, {merge: true});
  }

  updateUser(userId, userData) {
    return this.getUsersList().pipe(
      switchMap(usersList => this.db.doc('users/' + usersList.payload.data()[userId]).update(userData)));
  }

  deleteUser(userId: string) {
    this.db.doc('users/' + userId).delete();
  }

}

