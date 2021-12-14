import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: 'faq.page.html',
  styleUrls: ['faq.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class FaqPage implements OnInit {
 
  dummyData=[];
  data: any;
 
  constructor(private route: ActivatedRoute, private router: Router) {
    this.data =this.route.snapshot.params.type

    this.dummyData.push({name:'How to create a task?',description:''})
    this.dummyData.push({name:'What are events? How to create them?',description:''})
    this.dummyData.push({name:'How To sync Tax calendar to google Calendar/iCal?',description:'This an option in the settings page which allows you sync the govt. dates with your calendar. Make sure you have signed before you try to sync the data. The sync data is valid for this financial year'})
    this.dummyData.push({name:'How do i change my notification settings?',description:''})
    this.dummyData.push({name:'How to delete or modify a task or event',description:''})
    this.dummyData.push({name:'How do i use filter in my calendar?',description:''})
    this.dummyData.push({name:'How do i respond to the tasks or events',description:''})
    
  }
  ngOnInit(): void {
  }

}
