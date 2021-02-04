import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { COURSE_STATE } from 'src/app/core/constants/course-state';
import { Student } from 'src/app/core/models/student.model';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input() public student: Student;
  @Output() public coursesAddedEvent = new EventEmitter<any>();

  public listFG: FormGroup;
  public courses = [];
  public addedCourse = [];

  constructor(
    private fb: FormBuilder,
  ) {}

  reset(){
    this.listFG = this.fb.group({
      courses: this.fb.array([])
    });
    this.courses = [];
    this.addedCourse = [];
  }

  loadCourses(){
    const localData = JSON.parse(sessionStorage.getItem(this.student.id));
    const courseList = [];

    this.courses = localData ? localData.courses : this.student.enrollments[0].courses;

    this.courses.map(course => {
      const isChecked = localData ? course.checked : course.state === COURSE_STATE.APPROVED;

      course.checked = isChecked;

      this.addField(course.state === COURSE_STATE.APPROVED);
      courseList.push({
        id: course.id,
        checked: isChecked
      });
    });

    this.listFG.patchValue({ courses : courseList });
  }

  ngOnInit(): void {
    this.reset();
    this.loadCourses();
  }

  saveCourses(){
    sessionStorage.setItem(this.student.id, JSON.stringify({courses : this.courses}));
    this.coursesAddedEvent.emit(this.addedCourse.length);
  }

  addField(isDisabled: boolean): void {
    const çontrol = this.listFG.controls.courses as FormArray;
    çontrol.push(this.fb.group({
      id: [''],
      checked: [{value: false, disabled: isDisabled}],
    }));
  }

  onCheckboxChange(item, event): void {
    const status = event.srcElement.checked;
    if(status){
      this.addedCourse.push({id: item.value.id, checked: item.value.checked});
    } else {
      this.addedCourse = this.addedCourse.filter(c => c.id != item.value.id);
    }
    const course = this.courses.find(c => c.id == item.value.id);
    this.courses.map(c=>{
      if(course.id == c.id) c.checked = item.value.checked;
    });
  }

}
