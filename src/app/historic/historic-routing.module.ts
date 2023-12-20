import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricLayoutComponent } from './layouts/historic-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HistoricLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricRoutingModule { }
