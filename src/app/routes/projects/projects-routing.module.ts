import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsListComponent} from './list/list.component';
import {ProjectsEditComponent} from "./edit/edit.component";
import {ProjectsDetailComponent} from './detail/detail.component';
import {ProjectsTabinfoComponent} from './detail/tabinfo/tabinfo.component';
import { ProjectsProinfoComponent } from './detail/proinfo/proinfo.component';

const routes: Routes = [

  {path: 'list', component: ProjectsListComponent},
  {path: 'edit', component: ProjectsEditComponent},
  {path: 'detail', component: ProjectsDetailComponent},
  {path: 'tabinfo', component: ProjectsTabinfoComponent}
,
  { path: 'proinfo', component: ProjectsProinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
