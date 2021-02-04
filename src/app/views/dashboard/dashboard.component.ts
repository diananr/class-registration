import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STUDENT_STATE } from 'src/app/core/constants/student-state';
import { Student } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public students: Student[] = [];
  public studentsSummary = {
    pending: {
      label: 'Pendientes por editar',
      counter: 0,
      percent: '0%',
    },
    block: {
      label: 'Bloqueados',
      counter: 0,
      percent: '0%',
    },
    confirmed: {
      label: 'Editados',
      counter: 0,
      percent: '0%',
    }
  }

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) { }

  formatPercent(number: number){
    return `${(number * 100 / this.students.length).toFixed(0)}%`
  }

  getStudents(){
    this.studentService.getAllStudents().subscribe(
      (response: Student[])=>{
        this.students = response;
        this.students.forEach((s) => {
          if(s.state === STUDENT_STATE.PENDING)  this.studentsSummary.pending.counter += 1 ;
          if(s.state === STUDENT_STATE.ERROR)  this.studentsSummary.block.counter += 1;
          if(s.state === STUDENT_STATE.CONFIRMED)  this.studentsSummary.confirmed.counter += 1;
        });
        this.studentsSummary.pending.percent = this.formatPercent(this.studentsSummary.pending.counter);
        this.studentsSummary.block.percent = this.formatPercent(this.studentsSummary.block.counter);
        this.studentsSummary.confirmed.percent = this.formatPercent(this.studentsSummary.confirmed.counter);
      },
    )
  }

  ngOnInit(): void {
    this.getStudents();
  }

  goToStudentDetail(student: Student){
    if(student.state == STUDENT_STATE.PENDING) this.router.navigateByUrl(`/student/${student.id}`);
  }

}
