import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userDetails:any = {}
  constructor(private userService:UserService, private router:Router){
    this.userService.userObservable.subscribe((user:any) => {
      if(user){
        this.userDetails = user
      }
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('this.userDetails',this.userDetails)
      if(Object.keys(this.userDetails).length > 0){
        return true
      } else {
        this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    return false;
      }

      

    
  }
  
}
