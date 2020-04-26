import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Subject, throwError, of, Observable, BehaviorSubject} from 'rxjs';
import {UserData} from '../assets/user-mock';
import {User} from './shared/user-interface';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private db: AngularFirestore, private authService: AuthService) {
    }

    userData = new BehaviorSubject<User>(null);
    activeField: Subject<string> = new Subject();

    checkUserDataExists(userId) {
        return this.db.doc('users/' + userId).get().pipe(
            map(data => data.exists)
        );
    }

    getUserData(userId): Observable<User> {
        const getData = this.db.doc('users/' + userId).snapshotChanges().pipe(
            tap(user => this.userData.next(user.payload.data() as User)),
            map(snapshot => snapshot.payload.data() as User),
        );

        return this.userData.pipe(
            distinctUntilChanged(),
            switchMap(data => (!data || data.id !== userId) ? getData : of(data)),
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
            switchMap(isAble => isAble ?
                this.db.collection('users').doc(userId).set(UserData) :
                throwError('You don\'t have right\'s to edit this profile.')),
            map(() => UserData as User)
        );
    }

    updateUser(userId, userData) {
        return this.db.doc('users/' + userId).update(userData);
    }

    deleteUser(userId: string) {
        this.db.doc('users/' + userId).delete();
    }

}

