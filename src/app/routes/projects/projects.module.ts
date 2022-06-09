import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsEditComponent } from './edit/edit.component';
import { ProjectsListComponent } from './list/list.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzUploadModule} from "ng-zorro-antd/upload";

const COMPONENTS: Type<void>[] = [
  ProjectsEditComponent,
  ProjectsListComponent];

@NgModule({
    imports: [
        SharedModule,
        ProjectsRoutingModule,
        NzDividerModule,
        NzTagModule,
        NzUploadModule
    ],
  declarations: COMPONENTS,
})
export class ProjectsModule { }
