import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-with-analysis',
  templateUrl: './chart-with-analysis.component.html',
  styleUrls: ['./chart-with-analysis.component.scss']
})
export class ChartWithAnalysisComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  activeSymbol: string = 'VHM';

  constructor() { }

  ngOnInit() {
    // Component initialization
  }

  receiveMessage(event: any) {
    // Handle messages from chart component
    console.log('Message received from chart:', event);
    if (typeof event === 'string' && event.length > 0) {
      this.activeSymbol = event;
    }
  }
}
