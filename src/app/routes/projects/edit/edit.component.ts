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
      console.log(res)
      /**
       * 判断是否获取到路由项目proid参数，如果有则 编辑信息，否则 添加信息；
       */
      if (res.proId) {
        this.validateForm.patchValue({proId: res.proId});
        this.http.get(`http://localhost:8080/api/project/getProjectInfo/${res.proId}`).subscribe((pres: any) => {
          console.log(pres)
          let resFileData = pres.data.filePath.split('/');
          let dUrl = 'http://localhost:8080/api/minio/downloadFile';
          dUrl = dUrl + '?bucketName=' + resFileData[3] + '&filePath=/' + resFileData[4]+'/'+resFileData[5];
          let fileInfo: NzUploadFile = {uid: '1', name: 'file', status: 'done', url: dUrl};
          this.fileList = [fileInfo];

          this.validateForm.patchValue({
            proId: pres.data.proId,
            projectName: pres.data.projectName,
            pmo: pres.data.pmo,
            sponsor: pres.data.sponsor,
            technology: pres.data.technology,
            customer: pres.data.customer,
            application: pres.data.application,
            keyWords: pres.data.keyWords,
            filePath: pres.data.filePath,
          });
          console.log(this.validateForm.value)
        })
      }
    })
  }

  ngOnInit(): void {
  }

  optionList = [
    {label: 'Y', value: 'Y'},
    {label: 'N', value: 'N'}
  ];


  beforeUpload = (file: NzUploadFile): boolean => {
    let fileList = [file];
    fileList = fileList.slice(-1);
    this.fileList = fileList;
    console.log(this.fileList)
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    let myfile: any;
    this.fileList.forEach((file: any) => {
      myfile = file;
      formData.append('file', file);
    });
    this.uploading = true;
    this.http.post('http://localhost:8080/api/minio/upload', formData).subscribe((res: any) => {
      this.uploading = false;
      let fileInfo:NzUploadFile = {uid: myfile.uid, name: myfile.name, status: 'done', url: res.data};

      this.validateForm.patchValue({filePath:res.data});
      this.fileList = [fileInfo];
      // console.log(this.fileList, '----------------')
      this.msg.success('upload successfully11111.');
    })
  }

  //---------------------------------------

  submitForm(): void {
    this.http.post("http://localhost:8080/api/project/insertPro",this.validateForm.value).subscribe(res=>{
      console.log(res)
    })
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


  fileChange=(file: NzUploadFile):boolean => {
    //删除最后一个元素
    this.fileList = this.fileList.slice(0,-1);
    return true;
  }
}
