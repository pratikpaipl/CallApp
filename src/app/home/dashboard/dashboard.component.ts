import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/services/NavigationService';
import { GlobalProvider } from 'src/app/shared/GlobalProvider';
import { StorageService } from 'src/app/shared/StorageService';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  selAction = 'today'

  @Input()
  fromPage: String;

  @Input()
  imgPath: String;


  @Output()
  change: EventEmitter<Object> = new EventEmitter<Object>();

  // @ViewChild('doughnutCanvas') doughnutCanvas;
  // private doughnutChart: Chart;
  // @ViewChild('doughnutChart', { static: true }) doughnutChart: Chart;
  @ViewChild('barChart', { static: true }) barChart;
  bars: any;
  colorArray: any = ["#02a5e2", "#ed1a3b", "#333333",];

  constructor(public store: StorageService, private navigation: NavigationService, public globle: GlobalProvider, public router: Router) {
  }

  ngOnInit() {

    // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    //   type: "doughnut",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
    //       }
    //     ]
    //   }
    // });
  }
  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
      this.createBarChart()
    }, 1000);
  }
  createBarChart() {
    let ctx = this.barChart.nativeElement;
    ctx.height = 250;

    this.bars = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Rejected'],
        datasets: [{
          //label: 'Viewers in millions',
          data: [6, 4, 2],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: this.colorArray,// array should have same number of elements as number of dataset
          fill: false,
          borderWidth: 0.3,
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      },
      // options: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         display: false,
      //         beginAtZero: true
      //       }
      //     }]
      //   }
      // }
    });
  }
  callList(type) {
    this.router.navigateByUrl('/task-list/' + type);
  }

  publishBrand() {
    this.change.emit('publish');
  }
  back() {
    this.navigation.back();
  }
}
