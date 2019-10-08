import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() {
  }

  loading = new BehaviorSubject(true);

  loadingSetter = (state) => {
    if (this.loading.getValue() !== state) {
      this.loading.next(state);
    }
  }
}
