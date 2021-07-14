import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/models/login';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  errors: any = {
    Email: '',
    Password: ''
  };
  login: Login = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    if (this.authService.isLoggedIn) {
      router.navigate(['/prescriptions/my']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.login)
      .subscribe((res: any) => {
          if (this.authService.isLoggedIn) {
            this.authService.getAuthUser()
              .subscribe(res => {
                this.router.navigate(['/prescriptions/my']);
              });
          }
        },
        (error) => {
          console.log(error.error);
          this.errors = error.error.errors;
        });
  }
}
