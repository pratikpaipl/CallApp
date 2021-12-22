import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'edit-task',
  templateUrl: 'edit-task.page.html',
  styleUrls: ['edit-task.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class EditTaskPage implements OnInit {

  data: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((res) => {
      this.data = JSON.parse(res.value)
      console.log('data ', this.data);
    });
  }

  ngOnInit() {

  }

}
