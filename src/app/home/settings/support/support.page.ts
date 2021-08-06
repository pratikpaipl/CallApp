import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: 'support.page.html',
  styleUrls: ['support.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class SupportPage implements OnInit {
 
  data: any;
 
  constructor(private route: ActivatedRoute, private router: Router) {
    this.data =this.route.snapshot.params.type
   
  }
  ngOnInit(): void {
  }

}
