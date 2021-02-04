import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  @Input() public student: any;

  public studentFG: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
  ) { }

  reset(){
    this.studentFG = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone_number: this.fb.array([]),
      email: this.fb.array([]),
      birth_date: ['', [Validators.required]],
      curriculumName: ['', [Validators.required]],
      curriculumCode: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });
    this.addField('email');
    this.addField('phone_number');
  }

  ngOnInit(): void {
    this.reset();
    if(this.student.phone_number.length  == 2) this.addField('phone_number');
    if(this.student.email.length  == 2) this.addField('email');

    const studentForm =  { ...this.student };
    studentForm.phone_number = [];
    studentForm.email = [];
    studentForm.curriculumName = studentForm.enrollments[0].curriculum.name;
    studentForm.curriculumCode = studentForm.enrollments[0].curriculum.code;
    studentForm.level = studentForm.enrollments[0].level;

    this.student.phone_number.forEach(number => {
      studentForm.phone_number.push({value: number});
    });
    this.student.email.forEach(data => {
      studentForm.email.push({value: data});
    });

    this.studentFG.patchValue(studentForm);
  }

  updateStudent(){
    const body =  { ...this.studentFG.value };
    body.phone_number = body.phone_number.map(pn => pn.value);
    body.email = body.email.map(e => e.value);

    this.studentService.updateStudent(this.student.id, body).subscribe(
      (response: any)=>{
        this.router.navigateByUrl('/');
      },
      (error: any)=>{}
    )
  }

  addField(controlName: string): void {
    const çontrol = this.studentFG.controls[controlName] as FormArray;

    const validations = [Validators.required];
    if(controlName == 'email') validations.push(Validators.email);
    if(controlName == 'phone_number') validations.push(Validators.pattern(/^\+[1-9]{1}[ 0-9 ]{3,14}$/));

    if(this.studentFG.value[controlName].length < 2){
      çontrol.push(this.fb.group({
        value: [ '', validations ],
      }));
    }
  }

  removeField(i: any, controlName: string): void {
    const çontrol = this.studentFG.controls[controlName] as FormArray;
    if(this.studentFG.value[controlName].length != 1) çontrol.removeAt(i);
  }

}
