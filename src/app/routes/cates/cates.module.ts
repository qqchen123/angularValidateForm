import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { CatesRoutingModule } from './cates-routing.module';
import { CatesListComponent } from './list/list.component';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { CatesEditComponent } from './edit/edit.component';
import {NzUploadModule} from "ng-zorro-antd/upload";

const COMPONENTS: Type<void>[] = [
  CatesListComponent,
  CatesEditComponent];

@NgModule({
  imports: [
    SharedModule,
    CatesRoutingModule,
    NzTagModule,
    NzDividerModule,
    NzUploadModule
  ],
  declarations: COMPONENTS,
})
export class CatesModule { }
