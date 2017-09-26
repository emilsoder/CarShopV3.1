import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Headers} from "@angular/http";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  constructor(private http: Http) {
    this.http = http;
  }

  public getData(actionEndpoint: string): Observable<Response> {
    return this.http.get(actionEndpoint);
  }

  public postData(actionEndpoint: string, model: any, _headers: HeadersKeyValuePair[] = []): Observable<Response> {
    // let __headers = HttpService.HeadersBuilder(_headers);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(actionEndpoint, JSON.stringify(model), {headers});
  }

  public static HeadersBuilder(keyValuePairs: HeadersKeyValuePair[]): Headers {
    if (!keyValuePairs || keyValuePairs.length <= 0)
      return new Headers({'Content-Type': 'application/json'});

    let headers = new Headers();
    for (let i = 0; i < keyValuePairs.length; i++) {
      headers.append(keyValuePairs[i].key, keyValuePairs[i].value)
    }
    if (!headers.has("Content-Type")) {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }
}

export class HeadersKeyValuePair {
  public key: string;
  public value: string;
}
