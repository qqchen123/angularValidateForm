import {Component, Input, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-projects-proinfo',
  templateUrl: './proinfo.component.html',
  styles: [
    `
      .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
      }
      .ant-form-item-label{
        width: 100px;
      }

      [nz-form-label] {
        overflow: visible;
      }

      button {
        margin-left: 8px;
      }

      .search-area {
        text-align: right;
      }
    `
  ]
})
export class ProjectsProinfoComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
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

    this.getProjectInfoByPId();
  }
  @Input()
  public projectId:any;

  validateForm!: FormGroup;

  optionList = [
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' }
  ];

  resetForm(): void {
    this.validateForm.reset();
  }

  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);


  getProjectInfoByPId(){
    if (this.projectId) {
      this.validateForm.patchValue({proId: this.projectId});
      this.http.get(`http://localhost:8080/api/project/getProjectInfo/${this.projectId}`).subscribe((pres: any) => {
        this.validateForm.patchValue({
          proId: this.projectId,
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
  }

}
