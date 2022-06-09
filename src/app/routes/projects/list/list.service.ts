import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {catchError, of} from "rxjs";
import {HttpParams} from "@angular/common/http";

interface ProjectInfo {
  proId: string;
  projectName: string;
  pmo: string;
  sponsor: string;
  technology: string;
  customer: string;
  application: string;
  keyWords: string;
  filePath: string;
  m0Status: string;
  m0Time: string;
  t0Status: string;
  t1Time: string;
  t2Status: string;
  t2Time: string;
  isDelete: string;
  createTime: string;
  updateTime: string;
  t0Time: string;
  t1Status: string;
}

@Injectable({ providedIn: 'root' })
export class ListService {
  constructor(private http: _HttpClient) {}

  projectInfoUrl = 'http://localhost:8080/api/project/getProjectList';

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

    return this.http.get(this.projectInfoUrl, params).pipe(catchError(() => of({ results: [] })));
  }
}
