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
      address: ['', [Validators.required]],
      code: ['', [Validators.required]],
      email: this.fb.array([]),
      name: ['', [Validators.required]],
      phone_number: this.fb.array([]),
      birth_date: ['', [Validators.required]],
    });
    this.addField('email');
    this.addField('phone_number');
  }

  ngOnInit(): void {
    this.reset();
    if(this.student.phone_number.length  == 2) this.addField('phone_number');
    if(this.student.email.length  == 2) this.addField('email');

    const studentForm = Object.assign({}, this.student);
    studentForm.phone_number = [];
    studentForm.email = [];

    this.student.phone_number.forEach(number => {
      studentForm.phone_number.push({value: number});
    });
    this.student.email.forEach(data => {
      studentForm.email.push({value: data});
    });

    this.studentFG.patchValue(studentForm);
  }

  updateStudent(){
    const body =  Object.assign({}, this.studentFG.value);
    body.phone_number = body.phone_number.map(pn => pn.value);
    body.email = body.email.map(e => e.value);

    this.studentService.updateStudent(this.student.id, body).subscribe(
      (response: any)=>{
        console.log('response', response);
        this.router.navigateByUrl('/');
      },
      (error: any)=>{
        console.log('error', error);
      }
    )
  }

  addField(controlName: string): void {
    const çontrol = this.studentFG.controls[controlName] as FormArray;
    if(this.studentFG.value[controlName].length < 2){
      çontrol.push(this.fb.group({
        value: ['',[Validators.required]],
      }));
    }
  }

  removeField(i: any, controlName: string): void {
    const çontrol = this.studentFG.controls[controlName] as FormArray;
    if(this.studentFG.value[controlName].length != 1) çontrol.removeAt(i);
  }

}
