import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity=0;
  user!:User;
  isAuth:any=''
  constructor(private cartService:CartService,private userService:UserService) { 
    
  }

  ngOnInit(): void {
  // console.log('this',this.isAuth)
  this.cartService.getCartObservable().subscribe((newCart) =>{
    this.cartQuantity = newCart.totalCount;
  })

  this.userService.userObservable.subscribe((newUser)=>{
    console.log('newUser',newUser)
    if(Object.keys(newUser).length > 0){
      this.isAuth=newUser.email
    }
    this.user= newUser;
  })
  }

  logout(){
    this.userService.logout();
  }

  // get isAuth(){
  //   return this.user.token;
  // }

}
