import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('container', {static: true, read: ViewContainerRef}) _container: ViewContainerRef | any;

  constructor() {
  }

  ngOnInit() {
    // this.createChart();
    console.log('app-root ngOnInit version 1.0');
  }
}
