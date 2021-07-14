import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visit } from 'src/models/visit/visit';
import { AuthService } from 'src/services/auth.service';
import { VisitService } from 'src/services/visit.service';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  isDoctor: boolean = false;
  visits: Visit[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private visitService: VisitService
  ) {
    if (!this.authService.isLoggedIn) {
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.authService.getAuthUser()
      .subscribe(result => {
        if (result.position != undefined) {
          this.isDoctor = true;
        }
      });

    this.visitService.getMyVisits()
      .subscribe(res => {
        this.visits = res;
      });
  }

  transformDate(date: Date): string {
    let d = date.toString().substring(11, 19);
    d += ' ' + date.toString().replace('-', '.').replace('-', '.').substring(0, 10);
    return d;
  }
}
