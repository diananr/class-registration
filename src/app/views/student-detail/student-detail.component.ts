import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  public tabSelected = 'personal-data'

  private studentId: string;
  public student: Student;
  public coursesAdded: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
  ) { }

  getStudent(){
    this.studentService.getStudentById(this.studentId).subscribe(
      (response: Student)=>{
        this.student = response;
      },
      (error: HttpErrorResponse)=>{
        this.router.navigateByUrl('/');
      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params.studentId || '';

      if(this.studentId.length > 0) this.getStudent();
      else this.router.navigateByUrl('/');
    });
  }


}
