import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class AboutPage implements OnInit {
 
  data: any;
 
  constructor(private route: ActivatedRoute, private router: Router) {
    this.data =this.route.snapshot.params.type
   
  }
  ngOnInit(): void {
  }

}
