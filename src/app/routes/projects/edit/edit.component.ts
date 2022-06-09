import {Component, OnInit} from '@angular/core';
import {SFSchema, SFUISchema} from '@delon/form';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Observer} from "rxjs";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-projects-edit',
  templateUrl: './edit.component.html',
})
export class ProjectsEditComponent implements OnInit {
  uploading = false;
  fileList: NzUploadFile[] = [];

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private msg: NzMessageService,
              public http: _HttpClient,
              public route: ActivatedRoute) {
    this.validateForm = this.fb.group({
      proId: [''],
      projectName: ['', [Validators.required]],
      pmo: ['', [Validators.required]],
      sponsor: ['', [Validators.required]],
      technology: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      application: ['', [Validators.required]],
      keyWords: ['', [Validators.required]],
      filePath: ['', [Validators.required]],
    });

    /**
     * 接受路由参数
     */
    this.route.queryParams.subscribe((res: any) => {
      // console.log(res)
      /**
       * 判断是否获取到路由项目proid参数，如果有则 编辑信息，否则 添加信息；
       */
      if (res.porId) {
        this.validateForm.patchValue({proId: res.porId});
        this.http.get(`http://localhost:8080/api/project/getProjectInfo/${res.porId}`).subscribe((pres: any) => {
          this.validateForm.patchValue({
            proId: res.porId,
            projectName: pres.data.projectName,
            pmo: { label: pres.data.pmo, value: pres.data.pmo },
            sponsor: pres.data.sponsor,
            technology: pres.data.technology,
            customer: pres.data.customer,
            application: pres.data.application,
            keyWords: pres.data.keyWords,
            filePath: pres.data.filePath,
          });
        })
      }
    })

  }

  ngOnInit(): void {


  }

  //-------------------------

  optionList = [
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' }
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  log(value: { label: string; value: string; age: number }): void {
    console.log(value);
  }
  //-------------------------


  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;

    this.validateForm.patchValue({filePath: "test123"})
  }

  //---------------------------------------

  submitForm(): void {
    // this.http.post("http://localhost:8080/api/project/insertPro",this.validateForm.value).subscribe(res=>{
    //   console.log(res)
    // })
    console.log(this.validateForm.value)

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


}
