import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsEditComponent} from './edit/edit.component';
import {ProjectsListComponent} from './list/list.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {ProjectsDetailComponent} from './detail/detail.component';
import {ProjectsTabinfoComponent} from './detail/tabinfo/tabinfo.component';
import {ProjectsProinfoComponent} from './detail/proinfo/proinfo.component';

const COMPONENTS: Type<void>[] = [
  ProjectsEditComponent,
  ProjectsListComponent,
  ProjectsDetailComponent,
  ProjectsTabinfoComponent,
  ProjectsProinfoComponent
];

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
export class ProjectsModule {
}
