import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MailService {
  constructor(private http: HttpClient, private fireFunctions: AngularFireFunctions) {
    // fireFunctions.functions.useFunctionsEmulator('http://localhost:5001');
  }

  sendEmail(uid: string): void {
    this.http.get('https://json.geoiplookup.io').pipe(
      switchMap((client) => this.fireFunctions.httpsCallable('userEnter')({uid, client}))
    ).subscribe();
  }
}

