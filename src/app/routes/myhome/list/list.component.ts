import {Component, OnInit, ViewChild} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {filter} from "rxjs";

@Component({
  selector: 'app-myhome-list',
  templateUrl: './list.component.html',
})
export class MyhomeListComponent implements OnInit {
  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
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
      let resFileData = res.data.split('/');
      console.log(resFileData)
      // let dUrl = 'http://localhost:8080/api/minio/downloadFile?bucketName=tdms&filePath=/view.png&originalName=view.png';
      let dUrl = 'http://localhost:8080/api/minio/downloadFile';
      dUrl = dUrl + '?bucketName=' + resFileData[3] + '&filePath=/' + resFileData[4]+'/'+resFileData[5];
      let fileInfo: NzUploadFile = {uid: myfile.uid, name: myfile.name, status: 'done', url: dUrl};
      this.fileList = [fileInfo];
      this.msg.success('upload successfully11111.');
    })
  }

}
