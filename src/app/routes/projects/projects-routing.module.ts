import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsListComponent} from './list/list.component';
import {ProjectsEditComponent} from "./edit/edit.component";

const routes: Routes = [

  {path: 'list', component: ProjectsListComponent},
  {path: 'edit', component: ProjectsEditComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
