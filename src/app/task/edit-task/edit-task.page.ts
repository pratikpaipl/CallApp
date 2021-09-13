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
          console.log('data ', this.data  );
          this.name= this.data.taskname;
          this.startDate= moment(this.data.start_date).toISOString();
          this.dueDate= moment(this.data.due_date).toISOString();
          this.desc= this.data.taskdescription;
  
          console.log('name ',this.name  );
          console.log('startDate ',this.startDate  );
          console.log('dueDate ',this.dueDate  );
          console.log('desc ',this.desc  );
      });


     }
  ngOnInit() {
  }

}
