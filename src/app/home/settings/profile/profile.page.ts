import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  queries: {
    content: new ViewChild('content')
  }
})
export class ProfilePage implements OnInit {
 
  data: any;
 
  constructor(private route: ActivatedRoute, private router: Router) {
    this.data =this.route.snapshot.params.type
   
  }
  ngOnInit(): void {
  }
  onClick(type){
    this.router.navigateByUrl('/change-pass');
  }
}
