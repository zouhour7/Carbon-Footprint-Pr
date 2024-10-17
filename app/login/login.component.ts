import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    nameIndustry: '',
    password: '',
  };

  loginError = ''; // Declare the loginError property here

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit() {
    this.http.post<any>('http://localhost:8082/login', this.loginData).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/form']);
      },
      (error) => {
        console.error('Error during login:', error);
        if (error.status === 401) {
          this.loginError = 'Invalid password.';
        } else if (error.status === 404) {
          this.loginError = 'User not found.';
        } else {
          this.loginError = 'An error occurred during login.';
        }
      }
    );
  }

  gotohomepage() {
    this.router.navigate([""])
  }
}
