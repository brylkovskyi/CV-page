import {TestBed, getTestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {DataService} from './data.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserData} from '../assets/user-mock';
import {switchMap, tap} from 'rxjs/operators';
import {from} from 'rxjs';

describe('DataService', () => {
    let injector: TestBed;
    let service: DataService;
    let authService: AuthService;
    let uid;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
            providers: [AuthService, DataService, AngularFireAuth, AngularFirestore],
        });
        injector = getTestBed();
        service = injector.get(DataService);
        authService = injector.get(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('all CRUD operations to work properly', (done) => {
        authService.signIn({value: {email: 'mail@email.com', password: 'abc12345'}}).then(user => {
            expect(user.user.hasOwnProperty('uid')).toBe(true);
            uid = user.user.uid;

            // test createUser()
            service.createUser(uid).pipe(
                tap(res => {
                    expect(Object.keys(res)).toEqual(['id', 'name', 'profession', 'photoURL', 'data']);
                }),

                // test updateUser()
                switchMap(() => from(service.updateUser(uid, {...UserData, prop: 'new'}))),
                tap(res => {
                    expect(res).toBeUndefined();
                }),

                // test getUserData()
                switchMap(() => service.getUserData(uid)),
                tap(res => {
                    expect(Object.keys(res)).toEqual(['data', 'id', 'name', 'photoURL', 'profession', 'prop']);
                })
            ).subscribe(() => {
                // test deleteUser()
                service.deleteUser(uid).then((res) => {
                    expect(res).toBeUndefined();
                    done();
                });
            });
        });
    });
});

