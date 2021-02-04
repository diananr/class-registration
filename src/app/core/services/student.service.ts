import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StudentRequest } from '../models/student-request.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllStudents(){
    const url = 'https://plush-spry-hare.gigalixirapp.com/api/students';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(url, { headers }).pipe(
      map( (resp: {data: Student[]}) => resp.data )
    );
  }

  getStudentById(studentId: string){
    const url = `https://plush-spry-hare.gigalixirapp.com/api/students/${studentId}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(url, { headers }).pipe(
      map( (resp: {data: Student}) => resp.data )
    );
  }

  confirmStudent(studentId: string){
    const url = `https://plush-spry-hare.gigalixirapp.com/api/students/${studentId}?state=confirmed`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put(url, { headers });
  }

  updateStudent(studentId: string, body: StudentRequest){
    const url = `https://plush-spry-hare.gigalixirapp.com/api/students/${studentId}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put(url, {student: body}, { headers });
  }
}
