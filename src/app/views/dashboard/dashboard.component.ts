import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  getStudents(){
    this.studentService.getAllStudents().subscribe(
      (response: Student[])=>{
        this.students = response;
        this.students.forEach((s)=>{
          if(s.state == 'pending')  this.studentsSummary.pending.counter += 1 ;
          if(s.state == 'error')    this.studentsSummary.block.counter += 1;
          if(s.state == 'confirmed')  this.studentsSummary.confirmed.counter += 1;
        });
        this.studentsSummary.pending.percent = `${(this.studentsSummary.pending.counter * 100 / this.students.length).toFixed(0)}%`;
        this.studentsSummary.block.percent = `${(this.studentsSummary.block.counter * 100 / this.students.length).toFixed(0)}%`;
        this.studentsSummary.confirmed.percent = `${(this.studentsSummary.confirmed.counter * 100 / this.students.length).toFixed(0)}%`;
      },
    )
  }

  ngOnInit(): void {
    this.getStudents();
  }

  goToStudentDetail(student: Student){
    if(student.state == 'pending') this.router.navigateByUrl(`/student/${student.id}`);
  }

}
