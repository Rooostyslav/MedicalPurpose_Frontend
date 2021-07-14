import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isDoctor: boolean = false;
  user: User = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    position: '',
    kindOfActivity: ''
  };

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.authService.getAuthUser()
        .subscribe(result => {
          this.user = result;
          if (result.position != undefined) {
            this.isDoctor = true;
          }
        });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
