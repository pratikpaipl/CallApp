import { EventService } from '../../services/EventService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

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
