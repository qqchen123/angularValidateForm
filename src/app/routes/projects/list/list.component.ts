import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ListService} from "./list.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";

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

@Component({
  selector: 'app-projects-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
      }

      .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }

      [nz-form-label] {
        overflow: visible;
      }

      button {
        margin-left: 8px;
      }

      .collapse {
        margin-left: 8px;
        font-size: 12px;
      }

      .search-area {
        text-align: right;
      }
    `
  ]
})
export class ProjectsListComponent implements OnInit {
  total = 1;
  listOfProjectInfo: ProjectInfo[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterPMO = [
    { text: 'Y', value: 'Y' },
    { text: 'N', value: 'N' }
  ];

  loadDataFromServer(
    pageNum: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.listService.getProjectInfo(pageNum, pageSize, sortField, sortOrder, filter).subscribe(data => {
      console.log('--------------');
      console.log(data.data.list);
      console.log('--------------');

      this.loading = false;
      this.total = 12; // mock the total data here
      this.listOfProjectInfo = data.data.list;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private listService: ListService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);

    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
  }
}
