import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input() public courses: any;

  constructor() { }

  ngOnInit(): void {
  }

}
