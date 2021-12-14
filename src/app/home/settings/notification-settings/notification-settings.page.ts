import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notification-settings',
  templateUrl: 'notification-settings.page.html',
  styleUrls: ['notification-settings.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class NotificationSettingsPage implements OnInit {
 
  data: any;
  govDueDate:any;
  newTask:any;
  complete:any;
  assigned:any;
  desktop:any;
  mobile:any;
  email:any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.data =this.route.snapshot.params.type
   
  }
  ngOnInit(): void {
  }

}
