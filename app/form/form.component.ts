import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormDataService } from '../form-data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(private router: Router, private formDataService: FormDataService) { }

  formData = {
    name: '',          // Owner name (text input)
    nameI: '',         // Industry name (text input)
    email: '',         // E-mail (email input)
    numberM: null,     // Machines (number input)
    numberL: null,     // Lights (number input)
    numberE: null,     // Employees (number input)
    numberKW: '',      // Machines KW (text input, required)
    numberKL: null,    // Lights KW (number input, required)
    numberH: null,     // Hours (number input, required)
    numberD: null,     // Days (number input, required)
    numberV: null,     // Vacation (number input, required)
  };

  totalCarbonDay: number = 0; // Initialize to 0
  totalCarbonWeek: number = 0; // Initialize to 0
  totalCarbonYear: number = 0; // Initialize to 0

  onSubmit() {
    const numberKW = this.formData.numberKW?.trim(); // Use optional chaining to handle null
    if (numberKW) {
      const parts = numberKW.split(','); // Split the string by commas

      let totalWatts = 0;

      // Loop through the parts and perform calculations
      parts.forEach((part) => {
        const [watts, machines] = part.split(':'); // Split the part by colon
        const wattsNum = parseInt(watts);
        const machinesNum = parseInt(machines);

        if (!isNaN(wattsNum) && !isNaN(machinesNum)) {
          totalWatts += wattsNum * machinesNum;
        }
      });

      // Assign calculated values to component properties
      const xL = (this.formData.numberKL || 0) * (this.formData.numberL || 0) / 1000; 
      const xM = totalWatts / 1000;
      const SommeKW = xM + xL;
      this.totalCarbonDay = (SommeKW * 0.21) * (this.formData.numberH || 0); 
      this.totalCarbonWeek = this.totalCarbonDay * (this.formData.numberD || 0); 
      const year = (this.formData.numberD || 0) * 4 * 12 - (this.formData.numberV || 0); 
      this.totalCarbonYear = this.totalCarbonDay * year;
    }

    // Now, send the formData to the server
    this.formDataService.sendData(this.formData).subscribe(
      (response) => {
        console.log('Form data sent successfully:', response);
        // Reset the form after successful submission
        this.formData = {
          name: '',
          nameI: '',
          email: '',
          numberM: null,
          numberL: null,
          numberE: null,
          numberKW: '',
          numberKL: null,
          numberH: null, 
          numberD: null,
          numberV: null,
        };
        
        const navigationExtras: NavigationExtras = {
          state: {
            totalCarbonDay: this.totalCarbonDay,
            totalCarbonWeek: this.totalCarbonWeek,
            totalCarbonYear: this.totalCarbonYear
          }
        };
        this.router.navigate(['/results'], navigationExtras);
        
      },
      (error) => {
        console.error('Error sending form data:', error);
      }
    );
  }

  gotohomepage() {
    this.router.navigate([""]);
  }
}
