import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class ListPage implements OnInit {
 
  data: any;
 
  constructor(private route: ActivatedRoute, private router: Router) {
    this.data =this.route.snapshot.params.type
   
  }
  ngOnInit(): void {
  }

}
