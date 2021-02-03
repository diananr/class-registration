import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public students = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5},
    { id: 6},
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToStudentDetail(studentId: number){
    this.router.navigateByUrl(`/student`);
  }

}
