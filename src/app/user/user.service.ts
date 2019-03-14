import {Injectable} from '@angular/core';
import { UserData } from '../../assets/user-mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getEntity() {
    return UserData;
  }

  constructor() {
  }

}

