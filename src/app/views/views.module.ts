import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewsRoutingModule } from './views-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ViewsComponent } from './views.component';
import { StudentProfileComponent } from './student-detail/student-profile/student-profile.component';
import { StudentFormComponent } from './student-detail/student-form/student-form.component';
import { CourseListComponent } from './student-detail/course-list/course-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StudentDetailComponent,
    ViewsComponent,
    StudentProfileComponent,
    StudentFormComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ViewsRoutingModule
  ],
})
export class ViewsModule { }
