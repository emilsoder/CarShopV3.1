import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PubSubService {
  private subjects: Subject<any>[] = [];

  public publish(eventName: string) {
    this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
    this.subjects[eventName].next();
  }

  public on(eventName: string): Observable<any> {
    this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
    return this.subjects[eventName].asObservable();
  }
}
