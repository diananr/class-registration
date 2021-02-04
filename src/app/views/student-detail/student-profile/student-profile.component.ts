import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  @Input() public student: any;

  constructor(
    private router: Router,
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
  }

  confirmStudent(){
    this.studentService.confirmStudent(this.student.id).subscribe(
      (response: any)=>{
        this.router.navigateByUrl('/');
      },
      (error: any)=>{
        console.log('error', error);
      }
    )
  }

}