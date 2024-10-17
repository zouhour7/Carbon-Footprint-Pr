import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  totalCarbonDay: number = 0;
  totalCarbonWeek: number = 0;
  totalCarbonYear: number = 0;
  showResults: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route?.paramMap.subscribe(params => {
      const state = window.history.state;
      console.log('ResultsComponent ngOnInit executed! state:', state);
      if (state) {
        this.totalCarbonDay = state.totalCarbonDay;
        this.totalCarbonWeek = state.totalCarbonWeek;
        this.totalCarbonYear = state.totalCarbonYear;
      }
      this.showResults = true; // Set showResults to true to display the results
    });
  }
  gotoconactpage(){

    this.router.navigate(["/conact"]);
    
    }
    gotohomepage(){

      this.router.navigate([""])
      
      }
} 
