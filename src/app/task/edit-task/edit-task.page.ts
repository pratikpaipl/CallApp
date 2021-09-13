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
 
  name: any = '';
  desc: any = '';
  startDate: any = '';
  dueDate: any = '';
  
  constructor(private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe((res)=>{
          this.data = JSON.parse(res.value)       
      });

      if(this.data !=undefined){
        this.name= this.data.taskname;
        this.startDate= moment(this.data.start_date);
        this.dueDate= moment(this.data.due_date);
        this.desc= this.data.taskdescription;
      }

     }
  ngOnInit() {
  }

}
