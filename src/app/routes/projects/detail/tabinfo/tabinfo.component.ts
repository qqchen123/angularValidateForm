import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-projects-tabinfo',
  templateUrl: './tabinfo.component.html',
})
export class ProjectsTabinfoComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void {
    // console.log(this.projectId)
    // console.log('-----')
    // console.log(this.cateId)
    this.getcateList();
  }
  @Input()
  projectId:any;

  @Input()
  cateId:any;

  procedureCateList:any;

  getcateList() {
    this.http.get(`http://localhost:8080/api/cate/getCatesbyPid/${this.cateId}`).subscribe((res: any) => {
      this.procedureCateList = res.data;
      console.log(res)

    })
  }

  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
