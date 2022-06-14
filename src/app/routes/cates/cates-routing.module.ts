import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatesListComponent } from './list/list.component';
import { CatesEditComponent } from './edit/edit.component';

const routes: Routes = [

  { path: 'list', component: CatesListComponent },
  { path: 'edit', component: CatesEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatesRoutingModule { }
