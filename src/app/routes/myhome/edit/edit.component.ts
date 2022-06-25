import {Component, OnInit} from '@angular/core';
import {SFSchema, SFUISchema} from '@delon/form';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-myhome-edit',
  templateUrl: './edit.component.html',
})
export class MyhomeEditComponent implements OnInit {

  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit(): void {

    this.fileList = [
      {
        uid: '-1',
        name: '11111.png',
        status: 'done',
        url: 'http://localhost:8080/api/minio/downloadFile?bucketName=tdms&filePath=/view.png&originalName=view.png'
      }
    ];
  }

  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
}
