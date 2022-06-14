import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cates-edit',
  templateUrl: './edit.component.html',
})
export class CatesEditComponent implements OnInit {

  uploading = false;
  fileList: NzUploadFile[] = [];

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private msg: NzMessageService,
              public http: _HttpClient,
              public route: ActivatedRoute) {
    this.validateForm = this.fb.group({
      cateId: [''],
      cateName: ['', [Validators.required]],
      parentId: ['', [Validators.required]],
      tableInfo: ['', [Validators.required]],
    });

    /**
     * 接受路由参数
     */
    this.route.queryParams.subscribe((res: any) => {
      /**
       * 判断是否获取到路由项目proid参数，如果有则 编辑信息，否则 添加信息；
       */
      if (res.cateId) {
        this.validateForm.patchValue({cateId: res.cateId});
        this.http.get(`http://localhost:8080/api/cate/cateInfo/${res.cateId}`).subscribe((pres: any) => {
          console.log(pres)
          this.validateForm.patchValue({
            cateId: res.cateId,
            cateName: pres.data.cateName,
            parentId: pres.data.parentId,
            tableInfo: pres.data.tableInfo,
          });
        })
      }
    })
  }

  ngOnInit(): void {
    this.getParentCateList();
  }
  optionList = [
    // { label: 'Y', value: 'Y' },
    // { label: 'N', value: 'N' }
    {cateId:1,cateName:"M0",parentId:0,isDelete:"N",createTime:null,updateTime:null,tableInfo:null}
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  log(value: { label: string; value: string; age: number }): void {
    console.log(value);
  }

  submitForm(): void {
    // this.http.post("http://localhost:8080/api/project/insertPro",this.validateForm.value).subscribe(res=>{
    //   console.log(res)
    // })
    console.log(this.validateForm.value)
  }

  getParentCateList(){
    this.http.get(`http://localhost:8080/api/cate/getCatesbyPid/0`).subscribe((res: any) => {
      console.log(res.data,'====')
      this.optionList = res.data;
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }


  goback() {
    window.history.go(-1)
  }
}
