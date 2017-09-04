/**
 * Created by nitseg1 on 9/4/2017.
 */

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IMedia} from "../models/media.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/retry';

@Injectable()
export class MediaService {

  private _host: string;

  constructor (private http: HttpClient) {
    this._host = 'http://localhost:8080';
  }

  getNextMedia(curr_id?: number): Observable<IMedia> {
    return this.http.get(`${this._host}/api/media?after=${curr_id}`);
  }

  getPreviousMedia(curr_id: number): Observable<IMedia> {
    return this.http.get(`${this._host}/api/media?before=${curr_id}`);
  }
}
