import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {HttpParams} from "@angular/common/http";
import {catchError, of} from "rxjs";

interface CatesInfo {
  cateId: string;
  cateName: string;
  parentCate: string;
  isDelete: string;
  tableInfo: string;
  createTime: string;
  updateTime: string;
}

@Injectable({providedIn: 'root'})
export class CatesService {

  constructor(private http: _HttpClient) {
  }

  cateInfoUrl = 'http://localhost:8080/api/cate/cateList';

  getProjectInfo(
    pageNum: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ) {
    let params = new HttpParams()
      .append('pageNum', `${pageNum}`)
      .append('pageSize', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    // // @ts-ignore
    // return this.http.get<{ results: ProjectInfo[] }>(`${this.projectInfoUrl}`, {params}).pipe(catchError(() => of({results: []})));

    return this.http.get(this.cateInfoUrl, params).pipe(catchError(() => of({results: []})));
  }
}
