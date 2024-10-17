import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor (private router : Router, private http: HttpClient){}
  regData = {
    nameIndustry: '',
    password: ''
  };
  onSubmit() {
    // Send the form data to the server
    this.http.post<any>('http://localhost:8082/register', this.regData).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Redirect to the login page after successful registration
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  gotohomepage(){

    this.router.navigate([""])
    
    }

}
