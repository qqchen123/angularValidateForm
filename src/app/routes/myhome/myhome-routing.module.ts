import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyhomeListComponent} from './list/list.component';
import {MyhomeEditComponent} from "./edit/edit.component";

const routes: Routes = [

  {path: 'list', component: MyhomeListComponent},
  {path: 'edit', component: MyhomeEditComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyhomeRoutingModule {
}
