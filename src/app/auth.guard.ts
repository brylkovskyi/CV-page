import {Injectable} from '@angular/core';
import {
    CanActivate, CanLoad, Route, UrlSegment,
    ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {switchMap, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {
    }

    checkRights(id) {
        return this.authService.authStatusChecker().pipe(
            switchMap(data => of(data && data.uid === id)),
            tap(isAble => !isAble ? this.router.navigate(['/login']) : true)
        );
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkRights(next.params.id);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkRights(segments[0].parameters.id).pipe(take(1));
    }
}
