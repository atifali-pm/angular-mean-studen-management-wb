import {Injectable} from '@angular/core';
import {Student} from './student';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  // Add student
  AddStudent(data: Student): Observable<any> {
    const apiUrl = `${this.endpoint}/add-student`;
    return this.http.post(apiUrl, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all students
  GetStudents() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get student
  GetStudent(id): Observable<any> {
    const apiUrl = `${this.endpoint}/read-student/${id}`;
    return this.http.get(apiUrl, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update student
  UpdateStudent(id, data: Student): Observable<any> {
    const apiUrl = `${this.endpoint}/update-student/${id}`;
    console.log(data);
    return this.http.put(apiUrl, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete student
  DeleteStudent(id): Observable<any> {
    const apiUrl = `${this.endpoint}/delete-student/${id}`;
    return this.http.delete(apiUrl).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
