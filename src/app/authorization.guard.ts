import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = next.data.allowedRoles;
      const isAuthorized = this.authService.isAuthorized(allowedRoles);
  
      if (!isAuthorized) {
        this.router.navigate(['accessdenied']);
      }
  
      return isAuthorized;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      this.router.navigate(['accessdenied']);
    }

    return isAuthorized;
  }

}
