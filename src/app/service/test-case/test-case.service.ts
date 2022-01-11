import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TestCase } from 'src/app/model/test-case';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private testCasesUrl = 'api/test-case';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTestCases(): Observable<TestCase[]> {
    return this.http.get<TestCase[]>(this.testCasesUrl)
      .pipe(
        catchError(this.handleError<TestCase[]>("getTestCases", []))
      )
  }

  addTestCase(testCase: TestCase): Observable<TestCase> {
    console.log("addTestCase: "+testCase.name)
    return this.http.post<TestCase>(this.testCasesUrl, testCase, this.httpOptions).pipe(
      tap((newTestCase: TestCase) => this.log(`added testCase w/ id=${newTestCase.id}`)),
      catchError(this.handleError<TestCase>("addTestCase"))
    );
  }

  getTestCase(id: number): Observable<TestCase> {
    const url = `${this.testCasesUrl}/${id}`;
    return this.http.get<TestCase>(url).pipe(
      tap(_ => this.log(`fetched testCase id=${id}`)),
      catchError(this.handleError<TestCase>(`getTestCase id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateTestCase(testCase: TestCase): Observable<any> {
    return this.http.put(this.testCasesUrl, testCase, this.httpOptions).pipe(
      tap(_ => this.log(`updated testCase id=${testCase.id}`)),
      catchError(this.handleError<any>('updateTestCase'))
    );
  }

  deleteTestCase(id: number): Observable<TestCase> {
    const url = `${this.testCasesUrl}/${id}`;
    return this.http.delete<TestCase>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted testCase id=${id}`)),
      catchError(this.handleError<TestCase>('deleteTestCase'))
    );
  }

  searchTestCases(term: string): Observable<TestCase[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<TestCase[]>(`${this.testCasesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found testCases matching "${term}"`) :
        this.log(`no testCases matching "${term}"`)),
      catchError(this.handleError<TestCase[]>('searchTestCases', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`TestCaseService: ${message}`);
  }
}
