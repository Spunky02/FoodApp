import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStrorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  user = this.authService.user;
  private userSub : Subscription;

  constructor(private store : DataStrorageService,
              private authService: AuthService){}

  ngOnInit(){
  this.userSub = this.authService.user.subscribe(
    user => {
       this.isAuthenticated = !user ? false : true;
    }
  )
  console.log(this.isAuthenticated);
  }

  onSaveData(){
    this.store.storeRecipes();
  }
  onFetchData(){
    this.store.fetchRecipes();
  }
  onLogout(){
    this.authService.logout();
    
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
