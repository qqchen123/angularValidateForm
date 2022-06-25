import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { MyhomeRoutingModule } from './myhome-routing.module';
import { MyhomeListComponent } from './list/list.component';
import { MyhomeEditComponent } from './edit/edit.component';
import { MyhomeEditService } from './edit/edit.service';
import {NzUploadModule} from "ng-zorro-antd/upload";

const COMPONENTS: Type<void>[] = [
  MyhomeListComponent,
  MyhomeEditComponent];

@NgModule({
    imports: [
        SharedModule,
        MyhomeRoutingModule,
        NzUploadModule
    ],
  declarations: COMPONENTS,
  providers: [
    MyhomeEditService
  ],
})
export class MyhomeModule { }
