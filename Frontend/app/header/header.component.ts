import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { UserService } from '../shared/services/user.service';

import {TranslateService} from '@ngx-translate/core';

import { Globals } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit,OnDestroy {

  status: boolean;
 subscription:Subscription;

  constructor(private userService:UserService,private translate: TranslateService, private globals:Globals) {   
    translate.setDefaultLang('en');  
   }
   switchLanguage(language: string) {
    this.translate.use(language);
  }



  
   logout() {
     this.userService.logout();       
  }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
  }

   ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
