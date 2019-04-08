import { Component, OnInit } from '@angular/core';

import { HomeDetails } from '../models/home.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { Id } from '../../shared/models/id.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeDetails: HomeDetails;
  Id:Id;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    this.dashboardService.getHomeDetails()
    .subscribe((homeDetails: HomeDetails) => {
      this.homeDetails = homeDetails;
    },
    error => {
      //this.notificationService.printErrorMessage(error);
    });

    this.dashboardService.getId()
    .subscribe((Id: Id) => {
      this.Id = Id;
    },
        error => {
      //this.notificationService.printErrorMessage(error);
    });
    
  }

}
