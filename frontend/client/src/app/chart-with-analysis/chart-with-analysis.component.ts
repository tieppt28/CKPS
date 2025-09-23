import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-with-analysis',
  templateUrl: './chart-with-analysis.component.html',
  styleUrls: ['./chart-with-analysis.component.scss']
})
export class ChartWithAnalysisComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor() { }

  ngOnInit() {
    // Component initialization
  }

  receiveMessage(event: any) {
    // Handle messages from chart component
    console.log('Message received from chart:', event);
  }
}


