import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CatesService} from "./list.service";

interface CatesInfo {
  cateId: string;
  cateName: string;
  parentCate: string;
  isDelete: string;
  tableInfo: string;
  createTime: string;
  updateTime: string;
}

@Component({
  selector: 'app-cates-list',
  templateUrl: './list.component.html',
})
export class CatesListComponent implements OnInit {

  total = 1;
  listOfCatesInfo: CatesInfo[] = [];
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
      this.loading = false;
      this.total = 12; // mock the total data here
      this.listOfCatesInfo = data.data.list;
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

  constructor(private listService: CatesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }

}
