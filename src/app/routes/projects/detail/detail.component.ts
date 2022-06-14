import {Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-projects-detail',
  templateUrl: './detail.component.html',

})
export class ProjectsDetailComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getProcedureInfo();
    this.route.queryParams.subscribe((res: any) => {
      this.projectId = res.proId;
    });
  }

  procedureCate: any;
  projectId: any;

  getProcedureInfo() {
    this.http.get(`http://localhost:8080/api/cate/getCatesbyPid/0`).subscribe((res: any) => {
      this.procedureCate = res.data;
    });
  }

}
